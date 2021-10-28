export default {
  async signUp() {
    const response = await this.post('/sign_up');
    return response.data;
  },
  async signIn(params) {
    const response = await this.post('/sign_in', params);
    return response.data;
  },
};
