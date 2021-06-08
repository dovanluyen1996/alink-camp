export default class FormDataBuilder {
  static toFormData(params) {
    if (!params) return params;

    const formData = new FormData();
    this.buildFormData(formData, '', params);
    return formData;
  }

  static buildFormData(formData, appendKey, params) {
    Object.entries(params).forEach((key, value) => {
      if (Array.isArray(params)) key = '';
      if (appendKey) key = `${appendKey}[${key}]`;

      if (value instanceof Object && !(value instanceof File)) {
        this.buildFormData(formData, key, value);
      } else if (value === null || value === undefined) {
        formData.append(key, '');
      } else {
        formData.append(key, value);
      }
    });
  }
}
