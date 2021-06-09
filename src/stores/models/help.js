<<<<<<< HEAD
import Vue from 'vue';
import ApiClient from '@/api_client';

=======
import ApiClient from '@/api_client';

const attributes = () => (
  {
    id: null,
    title: null,
    description: null,
    image: null,
  }
);

>>>>>>> 3c06657 (Handle store helps)
export default {
  strict: true,
  namespaced: true,
  state: {
<<<<<<< HEAD
    helps: [],
    isLoading: false,
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
=======
    ...attributes(),
    helps: [],
  },
  mutations: {
    setAttributes(state, help) {
      Object.keys(attributes()).forEach((key) => {
        state[key] = help[key];
      });
    },
    setHelps(state, helps) {
      state.helps = helps;
    },
  },
  actions: {
    async getHelp(context, helpId) {
      context.commit('setIsLoading', true, { root: true });
      const help = await ApiClient.getHelp(helpId);

      context.commit('setAttributes', help);
    },
    async getHelps(context) {
      context.commit('setIsLoading', true, { root: true });
      const helps = await ApiClient.getHelps();

      context.commit('setHelps', helps);
>>>>>>> 3c06657 (Handle store helps)
    },
  },
};
