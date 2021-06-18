export default {
  async getCourses(params) {
    const response = await this.get('/courses', params);
    return response.data;
  },
  async getCourse(id) {
    const response = await this.get(`/courses/${id}`);
    return response.data;
  },
};
