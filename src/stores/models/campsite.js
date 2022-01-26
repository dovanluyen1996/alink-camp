import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    campsites: {
      campsites: [],
      totalCount: 0,
    },
    isLoading: false,
  },
  getters: {
    all: state => state.campsites.campsites,
    size: state => state.campsites.campsites.length,
    totalCount: state => state.campsites.totalCount,
  },
  mutations: {
    setCampsites(state, campsites) {
      const newCampsites = state.campsites;
      newCampsites.campsites = [...newCampsites.campsites, ...campsites.campsites];
      newCampsites.totalCount = campsites.totalCount;

      Vue.set(state, 'campsites', newCampsites);
    },
    setCampsite(state, campsite) {
      const index = state.campsites.campsites.findIndex(_campsite => _campsite.id === campsite.id);
      if (index < 0) return;

      Vue.set(state.campsites.campsites, index, campsite);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    resetCampsites(state) {
      const campsites = {
        campsites: [],
        totalCount: 0,
      };

      Vue.set(state, 'campsites', campsites);
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
