export default {
  async getSubscription() {
    const response = await this.get('/subscription');
    return response.data;
  },
};
