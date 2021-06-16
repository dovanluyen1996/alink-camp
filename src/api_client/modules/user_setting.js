export default {
  async getUserSetting() {
    const response = await this.get('/user_setting');
    return response.data;
  },
  async updateUserSetting(params) {
    const response = await this.put('/user_setting', params);
    return response.data;
  },
};
