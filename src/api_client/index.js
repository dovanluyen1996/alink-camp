/* eslint-disable no-underscore-dangle, class-methods-use-this */
import settings from '@/config/settings';
import HttpClient from '@/lib/http_client';
import ObjectKeyConverter from '@/lib/object_key_converter';
import FormDataBuilder from '@/lib/form_data_builder';
import modules from '@/api_client/modules';
import cognito from '@/cognito';

class ApiClient extends HttpClient {
  constructor() {
    super({
      baseURL: settings.api.url,
      timeout: settings.api.timeout,
    });

    this.storageKey = settings.localStorage.keys.session;

    this.axios.interceptors.request.use(async(config) => {
      this._log(`[${config.method.toUpperCase()}] ${config.url}`);

      if (config.data) {
        config.data = FormDataBuilder.toFormData(ObjectKeyConverter.camelToSnake(config.data));
      }

      const accessToken = await this.buildAccessToken();
      if (accessToken) config.headers[settings.authorization.accessToken.header] = accessToken;

      return config;
    });

    this.axios.interceptors.response.use(async(response) => {
      const appVersion = await cordova.getAppVersion.getVersionNumber();
      if (response.headers['x-client-app-version'] && !this.isNewestAppVersion(appVersion, response.headers['x-client-app-version'])) {
        const error = { status: 600, message: '新しいバージョンがリリースされています。アップデートしてください' };
        throw (error);
      }
      this._log([`[${response.config.method.toUpperCase()}] ${response.config.url} Response: ${response.status}`, response.data]);

      if (response && response.data) {
        response.data = ObjectKeyConverter.snakeToCamel(response.data);
      }

      return response;
    }, (error) => {
      let errorObject = {};

      if (!error.response || !error.response.data) {
        errorObject = { status: 500, message: 'サーバーエラーが発生しました' };
      } else {
        const errorResponse = error.response;
        errorObject = {
          status: errorResponse.status,
          message: errorResponse.data.error || errorResponse.data.messages,
        };
      }

      throw errorObject;
    });
  }

  async buildAccessToken() {
    try {
      const session = await cognito.isAuthenticated();

      return `${settings.authorization.accessToken.valuePrefix} ${session.accessToken.jwtToken}`;
    } catch (err) {
      console.log(err);

      return null;
    }
  }

  isNewestAppVersion(appVersion, newestVersion) {
    try {
      const appVersions = appVersion.split('.');
      if (appVersions.length !== 3) return true;

      const newestVersions = newestVersion.split('.');
      if (newestVersions.length !== 3) return true;

      const appVersionNumber = parseInt(appVersions.map(version => (`00${version}`).slice(-2)).join(''), 10);
      const newestVersionNumber = parseInt(newestVersions.map(version => (`00${version}`).slice(-2)).join(''), 10);

      return appVersionNumber >= newestVersionNumber;
    } catch (e) {
      console.log(e);
      return true;
    }
  }
}

Object.keys(modules).forEach((key) => {
  Object.assign(ApiClient.prototype, modules[key]);
});

export default new ApiClient();
/* eslint-enable no-underscore-dangle, class-methods-use-this */
