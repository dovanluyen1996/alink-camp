export default {
  async getTermsOfService() {
    const response = await this.get('/term_of_service');
    return response.data;
  },
};
