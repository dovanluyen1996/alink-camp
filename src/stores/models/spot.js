import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    spots: [],
    isLoading: false,
  },
  mutations: {
    setSpots(state, spots) {
      Vue.set(state, 'spots', spots);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getSpots(context) {
      context.commit('setIsLoading', true);

      try {
        const spots = await ApiClient.getSpots();

        context.commit('setSpots', spots);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
