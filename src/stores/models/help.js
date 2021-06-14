import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    helps: [],
    isLoading: false,
<<<<<<< HEAD
  },
  getters: {
    all: state => state.helps,
    findById: state => helpId => state.helps.find(help => help.id === helpId),
=======
>>>>>>> b256adf (Remove call api show)
  },
  getters: {
    all: state => state.helps,
    findById: state => helpId => state.helps.find(help => help.id === helpId),
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
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
