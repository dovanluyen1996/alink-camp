import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async createUserCoursePlan(context, { userCourseId, params }) {
      context.commit('setIsLoading', true);

      try {
        const userCoursePlan = await ApiClient.createUserCoursePlan(userCourseId, params);

        context.commit('models/userCourse/addUserCoursePlan', userCoursePlan, { root: true });
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUserCoursePlan(context, { userCourseId, userCoursePlanId, params }) {
      context.commit('setIsLoading', true);

      try {
        const userCoursePlan = await ApiClient.updateUserCoursePlan(
          userCourseId, userCoursePlanId, params,
        );

        context.commit('models/userCourse/updateUserCoursePlan', userCoursePlan, { root: true });
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async destroyUserCoursePlan(context, { userCourseId, userCoursePlanId }) {
      context.commit('setIsLoading', true);

      try {
        const userCoursePlan = await ApiClient.destroyUserCoursePlan(
          userCourseId, userCoursePlanId,
        );

        context.commit('models/userCourse/deleteUserCoursePlan', userCoursePlan, { root: true });
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
