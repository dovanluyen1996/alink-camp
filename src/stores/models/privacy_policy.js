import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    privacyPolicy: {},
    isLoading: false,
  },
  getters: {
    current: state => state.privacyPolicy,
    isLoading: state => state.isLoading,
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
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
