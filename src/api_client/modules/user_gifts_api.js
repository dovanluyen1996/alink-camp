export default {
  async createUserGift(params) {
    const response = await this.post('/user_gifts', params);
    return response.data;
  },
  async getUserGifts() {
    const response = await this.get('/user_gifts');
    return response.data;
  },
};
