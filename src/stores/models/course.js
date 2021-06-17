import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    course: {},
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setCourse(state, course) {
      Vue.set(state, 'course', course);
    },
  },
  actions: {
    async getCourse(context, { courseId }) {
      context.commit('setIsLoading', true);

      try {
        const course = await ApiClient.getCourse(courseId);

        context.commit('setCourse', course);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
