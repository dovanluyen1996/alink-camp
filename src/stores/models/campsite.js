import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    campsite: {},
    campsites: [],
    isLoading: false,
  },
  mutations: {
    setCampsites(state, campsites) {
      Vue.set(state, 'campsites', campsites);
    },
    setCampsite(state, campsite) {
      Vue.set(state, 'campsite', campsite);

      const index = state.campsites.findIndex(_campsite => _campsite.id === campsite.id);
      if (index < 0) return;

      Vue.set(state.campsites, index, campsite);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getCampsites(context, params) {
      context.commit('setIsLoading', true);

      try {
        const campsites = await ApiClient.getCampsites(params);

        context.commit('setCampsites', campsites);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getCampsite(context, { campsiteId }) {
      context.commit('setIsLoading', true);

      try {
        const campsite = await ApiClient.getCampsite(campsiteId);

        context.commit('setCampsite', campsite);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
