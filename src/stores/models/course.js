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
    async getCourses(context, searchParams) {
      context.commit('setIsLoading', true);

      try {
        const courses = await ApiClient.getCourses(searchParams);

        context.commit('setCourses', courses);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
