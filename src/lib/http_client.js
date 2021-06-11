/* eslint-disable no-underscore-dangle, class-methods-use-this */
import axios from 'axios';

export default class HttpClient {
  constructor(options = {}) {
    this.axios = axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout,
      headers: options.headers,
    });
  }

  async get(path, params, headers) {
    try {
      const response = await this.axios.get(
        path,
        {
          headers,
          params,
          responseType: 'json',
        },
      );

      return response;
    } catch (e) {
      this._log(e, 'error');
      throw e;
    }
  }

  async post(path, params, headers) {
    try {
      const response = await this.axios.post(
        path,
        params,
        { headers },
      );

      return response;
    } catch (e) {
      this._log(e, 'error');
      throw e;
    }
  }

  async put(path, params, headers) {
    try {
      const response = await this.axios.put(
        path,
        params,
        { headers },
      );

      return response;
    } catch (e) {
      this._log(e, 'error');
      throw e;
    }
  }

  async delete(path, headers) {
    try {
      const response = await this.axios.delete(
        path,
        { headers },
      );

      return response;
    } catch (e) {
      this._log(e, 'error');
      throw e;
    }
  }

  _log(message, level) {
    if (level === 'error') {
      this._logError(message);
    } else {
      this._logInfo(message);
    }
  }

  _logInfo(message) {
    if (message instanceof Array) {
      message[0] = this._logPrefix() + message[0];
      console.info(...message);
    } else if (message instanceof Object) {
      console.info(message);
    } else {
      console.info(`${this._logPrefix()} ${message}`);
    }
  }

  _logError(message) {
    if (message instanceof Object) {
      console.error(message);
    } else {
      console.error(`${this._logPrefix()} ${message}`);
    }
  }

  _logPrefix() {
    return `${this._logDate()} [API CLIENT]`;
  }

  _logDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = this._padZero(now.getMonth() + 1);
    const day = this._padZero(now.getDate());
    const hour = this._padZero(now.getHours());
    const minute = this._padZero(now.getMinutes());
    const second = this._padZero(now.getSeconds());

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  _padZero(value) {
    return value.toString().padStart(2, '0');
  }
}
/* eslint-enable no-underscore-dangle, class-methods-use-this */
