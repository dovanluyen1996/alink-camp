export default {
  async getNotices() {
    const response = await this.get('/notices');
    return response.data;
  },
};
