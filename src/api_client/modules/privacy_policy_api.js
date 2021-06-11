export default {
  async getPrivacyPolicy() {
    const response = await this.get('/privacy_policy');
    return response.data;
  },
};
