export default {
  async getSpots(params) {
    const response = await this.get('/spots', params);
    return response.data;
  },
};
