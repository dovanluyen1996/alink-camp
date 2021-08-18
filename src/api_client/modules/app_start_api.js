export default {
  async getAppStart() {
    const response = await this.get('/app_start');
    return response.data;
  },
};
