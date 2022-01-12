export default {
  async getSpots() {
    const response = await this.get('/spots');
    return response.data;
  },
};
