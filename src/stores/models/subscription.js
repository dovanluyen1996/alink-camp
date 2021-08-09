import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    subsAppStore: '',
    subsGooglePlay: '',
    isLoading: false,
  },
  mutations: {
    setSubsAppStore(state, subsAppStore) {
      Vue.set(state, 'subsAppStore', subsAppStore);
    },
    setSubsGooglePlay(state, subsGooglePlay) {
      Vue.set(state, 'subsGooglePlay', subsGooglePlay);
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

        context.commit('setSubsAppStore', subscription.appStore);
        context.commit('setSubsGooglePlay', subscription.googlePlay);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
