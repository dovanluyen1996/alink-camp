export default {
  async getGifts() {
    const response = await this.get('/gifts');
    return response.data;
  },
};
