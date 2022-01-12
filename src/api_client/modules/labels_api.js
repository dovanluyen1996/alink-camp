export default {
  async getLabels() {
    const response = await this.get('/labels');
    return response.data;
  },
};
