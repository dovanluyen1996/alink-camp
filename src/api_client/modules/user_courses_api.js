export default {
  async getUserCourses() {
    const response = await this.get('/user_courses');
    return response.data;
  },
  async createUserCourse(params) {
    const response = await this.post('/user_courses', params);
    return response.data;
  },
  async updateUserCourse(id, params) {
    const response = await this.put(`/user_courses/${id}`, params);
    return response.data;
  },
};
