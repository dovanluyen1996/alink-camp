import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    choosenCampsite: {},
    isLoading: false,
  },
  getters: {
    choosenCampsite: state => state.choosenCampsite,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setChoosenCampsite(state, campsite) {
      Vue.set(state, 'choosenCampsite', campsite);
    },
  },
  actions: {
    async getChoosenCampsite(context, campsiteId) {
      context.commit('setIsLoading', true);

      try {
        const campsite = await ApiClient.getCampsite(campsiteId);

        context.commit('setChoosenCampsite', campsite);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
