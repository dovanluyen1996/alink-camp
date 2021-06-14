import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    privacyPolicy: {},
    isLoading: false,
  },
  mutations: {
    setPrivacyPolicy(state, privacyPolicy) {
      Vue.set(state, 'privacyPolicy', privacyPolicy);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getPrivacyPolicy(context) {
      context.commit('setIsLoading', true);

      try {
        const privacyPolicy = await ApiClient.getPrivacyPolicy();

        context.commit('setPrivacyPolicy', privacyPolicy);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
