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
      this.log(`[${config.method.toUpperCase()}] ${config.url}`);

      if (config.data) {
        config.data = FormDataBuilder.toFormData(ObjectKeyConverter.camelToSnake(config.data));
      }

      return config;
    });

    this.axios.interceptors.response.use((response) => {
      this.log(`Response: ${response.status}`);

      if (response && response.data) {
        this.log(response.data);
        response.data = ObjectKeyConverter.snakeToCamel(response.data);
      }

      return response;
    }, (error) => {
      const { status } = error.response;
      this.log(`Response: ${status}`);

      switch (status) {
      case 500:
        // TODO: redirect to 500 page
        break;
      case 404:
        // TODO: redirect to 404 page
        break;
      case 422:
        // TODO: redirect to 422 page
        break;
      default:
        return {
          hasError: true,
          data: error.response.data,
        };
      }

      return error;
    });
  }
}

Object.keys(modules).forEach((key) => {
  Object.assign(ApiClient.prototype, modules[key]);
});

export default new ApiClient();
