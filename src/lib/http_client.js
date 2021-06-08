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
      this.log(e, 'error');
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
      this.log(e, 'error');
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
      this.log(e, 'error');
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
      this.log(e, 'error');
      throw e;
    }
  }

  log(message, level) {
    if (level === 'error') {
      this.logError(message);
    } else {
      this.logInfo(message);
    }
  }

  logInfo(message) {
    if (message instanceof Object) {
      console.info(message);
    } else {
      console.info(`${this.logPrefix()} ${message}`);
    }
  }

  logError(message) {
    if (message instanceof Object) {
      console.error(message);
    } else {
      console.error(`${this.logPrefix()} ${message}`);
    }
  }

  logPrefix() {
    return `${this.logDate()} [API CLIENT]`;
  }

  logDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = this.padZero(now.getMonth() + 1);
    const day = this.padZero(now.getDate());
    const hour = this.padZero(now.getHours());
    const minute = this.padZero(now.getMinutes());
    const second = this.padZero(now.getSeconds());

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  /* eslint-disable class-methods-use-this */
  padZero(value) {
    return value.toString().padStart(2, '0');
  }
  /* eslint-enable class-methods-use-this */
}
