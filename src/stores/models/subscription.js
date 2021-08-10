import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    subscription: {},
    isLoading: false,
  },
  getters: {
    current: state => state.subscription,
    isLoading: state => state.isLoading,
  },
  mutations: {
    setSubscription(state, subscription) {
      Vue.set(state, 'subscription', subscription);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getSubscription(context) {
      context.commit('setIsLoading', true);

      try {
        const subscription = await ApiClient.getSubscription();

        context.commit('setSubscription', subscription);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
