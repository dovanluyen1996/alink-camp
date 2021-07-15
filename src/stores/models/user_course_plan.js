import Vue from 'vue';
import ApiClient from '@/api_client';
import moment from 'moment';

export default {
  strict: true,
  namespaced: true,
  state: {
    userCoursePlans: [],
    isLoading: false,
  },
  mutations: {
    addUserCoursePlan(state, userCoursePlan) {
      state.userCoursePlans.push(userCoursePlan);
    },
    updateUserCoursePlan(state, userCoursePlan) {
      const index = state.userCoursePlans.findIndex(
        _userCoursePlan => _userCoursePlan.id === userCoursePlan.id,
      );
      if (index < 0) return;

      Vue.set(state.userCoursePlans, index, userCoursePlan);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async createUserCoursePlan(context, { userCourseId, params }) {
      context.commit('setIsLoading', true);

      try {
        const userCoursePlan = await ApiClient.createUserCoursePlan(userCourseId, params);

        context.commit('addUserCoursePlan', userCoursePlan);
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

        context.commit('updateUserCoursePlan', userCoursePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
