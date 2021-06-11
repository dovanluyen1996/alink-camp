export default {
  async getNotices() {
    const response = await this.get('/notices');
    return response.data;
  },
  async getNotice(noticeId) {
    const response = await this.get(`/notices/${noticeId}`);
    return response.data;
  },
};
