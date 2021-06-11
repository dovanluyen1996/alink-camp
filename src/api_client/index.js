/* eslint-disable no-underscore-dangle */
import settings from '@/config/settings';
import HttpClient from '@/lib/http_client';
import ObjectKeyConverter from '@/lib/object_key_converter';
import FormDataBuilder from '@/lib/form_data_builder';
import modules from '@/api_client/modules';

class ApiClient extends HttpClient {
  constructor() {
    super({
      baseURL: settings.api.url,
      timeout: settings.api.timeout,
    });

    this.storageKey = settings.localStorage.keys.session;

    this.axios.interceptors.request.use((config) => {
      this._log(`[${config.method.toUpperCase()}] ${config.url}`);

      if (config.data) {
        config.data = FormDataBuilder.toFormData(ObjectKeyConverter.camelToSnake(config.data));
      }

      return config;
    });

    this.axios.interceptors.response.use((response) => {
      this._log([`[${response.config.method.toUpperCase()}] ${response.config.url} Response: ${response.status}`, response.data]);

      if (response && response.data) {
        response.data = ObjectKeyConverter.snakeToCamel(response.data);
      }

      return response;
    });
  }
}

Object.keys(modules).forEach((key) => {
  Object.assign(ApiClient.prototype, modules[key]);
});

export default new ApiClient();
/* eslint-enable no-underscore-dangle */
