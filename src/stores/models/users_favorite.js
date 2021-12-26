import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    usersFavorites: [],
    isLoading: false,
  },
  mutations: {
    setUsersFavorites(state, usersFavorites) {
      Vue.set(state, 'usersFavorites', usersFavorites);
    },
    addUsersFavorite(state, usersFavorite) {
      state.usersFavorites.push(usersFavorite);
    },
    deleteUsersFavorite(state, usersFavorite) {
      const index = state.usersFavorites.findIndex(
        _usersFavorite => _usersFavorite.id === usersFavorite.id,
      );

      if (index < 0) return;

      Vue.delete(state.userCourseResults, index);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getUsersFavorites(context) {
      context.commit('setIsLoading', true);

      try {
        const usersFavorites = await ApiClient.getUsersFavorites();

        context.commit('setUsersFavorites', usersFavorites);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async createUsersFavorite(context, params) {
      context.commit('setIsLoading', true);

      try {
        const usersFavorite = await ApiClient.createUsersFavorite(params);

        context.commit('addUsersFavorite', usersFavorite);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async deleteUsersFavorite(context, { campsiteId }) {
      context.commit('setIsLoading', true);

      try {
        const usersFavorite = await ApiClient.deleteUsersFavorite(campsiteId);

        context.commit('deleteUsersFavorite', usersFavorite);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
