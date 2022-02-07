import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    params: {
      campsiteId: null,
      startedDate: '',
      finishedDate: '',
      itemIds: [],
      tasks: [],
    },
    isLoading: false,
  },
  getters: {
    params: state => state.params,
    isLoading: state => state.isLoading,
  },
  mutations: {
    setCampsiteId(state, campsiteId) {
      Vue.set(state.params, 'campsiteId', campsiteId);
    },
    setStartedDate(state, startedDate) {
      Vue.set(state.params, 'startedDate', startedDate);
    },
    setFinishedDate(state, finishedDate) {
      Vue.set(state.params, 'finishedDate', finishedDate);
    },
  },
  actions: {
    setCampsiteId(context, campsiteId) {
      context.commit('setCampsiteId', campsiteId);
    },
    setStartedDate(context, startedDate) {
      context.commit('setStartedDate', startedDate);
    },
    setFinishedDate(context, finishedDate) {
      context.commit('setFinishedDate', finishedDate);
    },
  },
};
