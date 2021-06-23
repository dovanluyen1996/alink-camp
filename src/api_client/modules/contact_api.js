export default {
  async sendContact(params) {
    const response = await this.post('/contact', params);
    return response.data;
  },
};
