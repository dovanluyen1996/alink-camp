export default {
  async getUserStamp() {
    const response = await this.get('/user_stamp');
    return response.data;
  },
};
