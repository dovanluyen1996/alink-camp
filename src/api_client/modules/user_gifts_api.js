export default {
  async createUserGift(params) {
    const response = await this.post('/user_gifts', params);
    return response.data;
  },
};
