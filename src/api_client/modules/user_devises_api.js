export default {
  async createUserDevise(params) {
    const response = await this.post('/user_devises', params);
    return response.data;
  },
};
