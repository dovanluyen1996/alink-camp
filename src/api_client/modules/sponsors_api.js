export default {
  async getSponsors() {
    const response = await this.get('/sponsors');
    return response.data;
  },
};
