import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    helps: [],
    isLoading: false,
  },
  getters: {
    all: state => state.helps,
    findById: state => helpId => state.helps.find(help => help.id === helpId),
    isLoading: state => state.isLoading,
  },
  mutations: {
    setHelps(state, helps) {
      Vue.set(state, 'helps', helps);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getHelps(context) {
      context.commit('setIsLoading', true);

      try {
        const helps = await ApiClient.getHelps();

        context.commit('setHelps', helps);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
