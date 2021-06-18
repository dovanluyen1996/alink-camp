export default {
  async getCourses(searchParams) {
    const response = await this.get('/courses', searchParams);
    return response.data;
  },
  async getCourse(id) {
    const response = await this.get(`/courses/${id}`);
    return response.data;
  },
};
