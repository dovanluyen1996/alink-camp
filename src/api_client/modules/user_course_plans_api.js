export default {
  async createUserCoursePlan(userCourseId, params) {
    const response = await this.post(`/user_courses/${userCourseId}/user_course_plans`, params);
    return response.data;
  },
  async updateUserCoursePlan(userCourseId, userCoursePlanId, params) {
    const response = await this.put(
      `/user_courses/${userCourseId}/user_course_plans/${userCoursePlanId}`, params,
    );
    return response.data;
  },
  async destroyUserCoursePlan(userCourseId, userCoursePlanId) {
    const response = await this.delete(
      `/user_courses/${userCourseId}/user_course_plans/${userCoursePlanId}`,
    );
    return response.data;
  },
};
