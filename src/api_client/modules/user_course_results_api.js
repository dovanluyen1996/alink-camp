export default {
  async getUserCourseResults(userCourseId) {
    const response = await this.get(`/user_courses/${userCourseId}/user_course_results`);
    return response.data;
  },
  async createUserCourseResult(userCourseId, params) {
    const response = await this.post(`/user_courses/${userCourseId}/user_course_results`, params);
    return response.data;
  },
  async updateUserCourseResult(userCourseId, userCourseResultId, params) {
    const response = await this.put(`/user_courses/${userCourseId}/user_course_results/${userCourseResultId}`, params);
    return response.data;
  },
  async destroyUserCourseResult(userCourseId, userCourseResultsId) {
    const response = await this.delete(`/user_courses/${userCourseId}/user_course_results/${userCourseResultsId}`);
    return response.data;
  },
};
