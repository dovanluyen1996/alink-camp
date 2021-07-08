import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    courses: [],
    isLoading: false,
  },
  getters: {
    all: state => state.courses,
    size: state => state.courses.length,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setCourses(state, courses) {
      Vue.set(state, 'courses', courses);
    },
  },
  actions: {
    async getCourses(context, params) {
      context.commit('setIsLoading', true);

      try {
        const courses = await ApiClient.getCourses(params);

        context.commit('setCourses', courses);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    resetCourses(context) {
      context.commit('setCourses', []);
    },
  },
};
