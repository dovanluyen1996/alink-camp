export default {
  async signUp() {
    const response = await this.post('/sign_up');

    await this.saveSession(response.headers);

    return response.data;
  },
  async signIn(params) {
    const response = await this.post('/sign_in', params);

    await this.saveSession(response.headers);

    return response.data;
  },
};
