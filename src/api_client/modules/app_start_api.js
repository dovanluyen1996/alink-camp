export default {
  async getAppStart() {
    const response = await this.get('/app_start');
    return response.headers['x-client-app-version'];
  },
};
