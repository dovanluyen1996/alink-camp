export default {
  async getUserCourseResult() {
    const response = await this.get('/user_course_results');
    return response.data;
  },
  async createUserCourseResult(userCourseResult) {
    const response = await this.post('/user_course_results', userCourseResult);
    return response.data;
  },
  async updateUserCourseResult(userCourseResultId, userCourseResult) {
    const response = await this.put(`/user_course_results/${userCourseResultId}`, userCourseResult);
    return response.data;
  },
  async destroyUserCourseResult(userCourseResultsId) {
    const response = await this.delete(`/user_course_results/${userCourseResultsId}`);
    return response.data;
  },
};
