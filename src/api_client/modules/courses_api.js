export default {
  async getCourse(id) {
    const response = await this.get(`/courses/${id}`);
    return response.data;
  },
};
