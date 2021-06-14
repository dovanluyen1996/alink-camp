export default {
  async getHelps() {
    const response = await this.get('/helps');
    return response.data;
  },
};
