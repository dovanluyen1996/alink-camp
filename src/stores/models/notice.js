import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    notices: [],
    isLoading: false,
  },
  mutations: {
    setNotices(state, notices) {
      Vue.set(state, 'notices', notices);
    },
    setIsLoading(state, isLoading) {
      Vue.set(state, 'isLoading', isLoading);
    },
  },
  actions: {
    async getNotices(context) {
      context.commit('setIsLoading', true);

      try {
        const notices = await ApiClient.getNotices();

        context.commit('setNotices', notices);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
