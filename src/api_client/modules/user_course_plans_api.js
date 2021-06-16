export default {
  async createUserCoursePlan(userCourseId, params) {
    const response = await this.post(`/user_courses/${userCourseId}/user_course_plans`, params);
    return response.data;
  },
  async updateUserCoursePlan(userCourseId, userCoursePlanId, params) {
    const response = await this.post(
      `/user_courses/${userCourseId}/user_course_plans/${userCoursePlanId}`, params,
    );
    return response.data;
  },
};
