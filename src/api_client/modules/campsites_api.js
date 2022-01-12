export default {
  async getCampsites(params) {
    const response = await this.get('/campsites', params);
    return response.data;
  },
  async getCampsite(id) {
    const response = await this.get(`/campsites/${id}`);
    return response.data;
  },
};
