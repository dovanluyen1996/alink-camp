export default {
  async getTermOfService() {
    const response = await this.get('/term_of_service');
    return response.data;
  },
};
