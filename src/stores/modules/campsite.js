import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    viewedCampsites: [],
    choosenCampsite: {},
    isLoading: false,
    searched: false,
  },
  getters: {
    viewedCampsites: state => state.viewedCampsites,
    choosenCampsite: state => state.choosenCampsite,
    searchConditionActiveIndex: state => state.searchConditionActiveIndex,
  },
  mutations: {
    setViewedCampsites(state, campsites) {
      Vue.set(state, 'viewedCampsites', campsites);
    },
    addViewedCampsite(state, campsite) {
      // If exsited viewed, don't add campsite to Store
      const exsitedViewedCampsiteIndex = state.viewedCampsites.findIndex(
        _viewed => _viewed.id === campsite.id,
      );

      // If exsited in Viewed Campsites
      if (exsitedViewedCampsiteIndex >= 0) {
        Vue.delete(state.viewedCampsites, exsitedViewedCampsiteIndex);
      }

      // 閲覧履歴 will show 5 items, therefore if current 閲覧履歴 is 5, delete the first item
      state.viewedCampsites.push(campsite);

      const removeCount = state.viewedCampsites.length - 5;
      state.viewedCampsites.splice(0, removeCount);

      // Update 閲覧履歴 local storage
      localStorage.setItem('viewedCampsites', JSON.stringify(state.viewedCampsites));
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setChoosenCampsite(state, campsite) {
      Vue.set(state, 'choosenCampsite', campsite);
    },
    setSearched(state, searched) {
      state.searched = searched;
    },
  },
  actions: {
    addViewedCampsites(context, campsite) {
      context.commit('addViewedCampsite', campsite);
    },
    setViewedCampsitesByCache(context) {
      // Get viewed campsites from Local Storage
      context.commit('setViewedCampsites', JSON.parse(localStorage.getItem('viewedCampsites')) || []);
    },
    setChoosenCampsite(context, campsite) {
      context.commit('setChoosenCampsite', campsite);
    },
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
