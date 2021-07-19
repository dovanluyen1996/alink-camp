import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    courses: {
      courses: [],
      totalCount: 0,
    },
    isLoading: false,
  },
  getters: {
    all: state => state.courses.courses,
    size: state => state.courses.courses.length,
    totalCount: state => state.courses.totalCount,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setCourses(state, courses) {
      const newCourses = state.courses;
      newCourses.courses = [...newCourses.courses, ...courses.courses];
      newCourses.totalCount = courses.totalCount;

      Vue.set(state, 'courses', newCourses);
    },
    resetCourses(state) {
      const courses = {
        courses: [],
        totalCount: 0,
      };

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
      context.commit('resetCourses');
    },
  },
};
