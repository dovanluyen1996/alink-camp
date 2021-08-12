/* eslint-disable no-underscore-dangle, no-unused-vars, consistent-return */
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { Config, CognitoIdentityCredentials } from 'aws-sdk';
import HttpClient from '@/lib/http_client';

export default class Cognito {
  configure(config) {
    if (config.userPool) {
      this.userPool = config.userPool;
    } else {
      this.userPool = new CognitoUserPool({
        UserPoolId: config.UserPoolId,
        ClientId: config.ClientId,
      });
    }
    Config.region = config.Region;
    // Config.credentials = new CognitoIdentityCredentials({
    //   IdentityPoolId: config.IdentityPoolId
    // })
    this.options = config;
    this.cognitoHttpClient = new HttpClient({
      baseURL: config.UserPoolDomain,
    });
  }

  static install = (Vue, options) => {
    Object.defineProperty(Vue.prototype, '$cognito', {
      get() { return this.$root._cognito; },
    });

    Vue.mixin({
      beforeCreate() {
        if (this.$options.cognito) {
          this._cognito = this.$options.cognito;
          this._cognito.configure(options);
        }
      },
    });
  }

  /**
   * username, passwordでサインアップ
   * username = emailとしてUserAttributeにも登録
   */
  signUp(username, password) {
    const dataEmail = { Name: 'email', Value: username };
    const attributeList = [];
    attributeList.push(new CognitoUserAttribute(dataEmail));

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          // For auto login after signUp
          const authenticationData = { username, password };
          localStorage.setItem('authenticationData', JSON.stringify(authenticationData));

          resolve(result);
        }
      });
    });
  }

  /**
   * 確認コードからユーザーを有効化する
   */
  confirmation(username, confirmationCode) {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * resendConfirmationCode
   */
  resendConfirmationCode(username) {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * username, passwordでログイン
   */
  login(username, password) {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);
    const authenticationData = { Username: username, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          localStorage.setItem('externalProviderSignIn', false);
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  /**
   * ログアウト
   */
  logout() {
    this.userPool.getCurrentUser().signOut();
  }

  /**
   * ログインしているかの判定
   */
  isAuthenticated() {
    const cognitoUser = this.userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser === null) { return reject(cognitoUser); }
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
        } else if (!session.isValid()) {
          reject(session);
        } else {
          resolve(session);
        }
      });
    });
  }

  /**
   * forgotPassword
   */
  forgotPassword(username) {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  /**
   * confirmPassword
   */
  confirmPassword(username, verificationCode, newPassword) {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  /**
   * changePassword
   */
  changePassword(oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
      const cognitoUser = this.userPool.getCurrentUser();
      if (!cognitoUser) return reject(new Error('User is not authenticated'));

      cognitoUser.getSession((sessionErr, _session) => {
        if (sessionErr) return reject(sessionErr);

        cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  }

  /**
   * get oauth token form code
   */
  async getOauthToken(code) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = new URLSearchParams({
      grant_type: this.options.OauthFlow,
      client_id: this.options.ClientId,
      redirect_uri: this.options.CallbackUrl,
      code,
    });
    const response = await this.cognitoHttpClient.post('/oauth2/token', params, headers);

    return response.data;
  }

  /**
   * get user's info
   */
  async getOauthUserInfo(accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await this.cognitoHttpClient.get('/oauth2/userInfo', {}, headers);

    return response.data;
  }
}
/* eslint-enable no-underscore-dangle, no-unused-vars, consistent-return */
