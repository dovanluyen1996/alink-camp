import Vue from 'vue';

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
    setItemIds(state, itemIds) {
      Vue.set(state.params, 'itemIds', itemIds);
    },
    setTasks(state, tasks) {
      Vue.set(state.params, 'tasks', tasks);
    },
    resetPlan(state) {
      const params = {
        campsiteId: null,
        startedDate: '',
        finishedDate: '',
        itemIds: [],
        tasks: [],
      };

      Vue.set(state, 'params', params);
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
    setItemIds(context, itemIds) {
      context.commit('setItemIds', itemIds);
    },
    setTasks(context, tasks) {
      context.commit('setTasks', tasks);
    },
    resetPlan(context) {
      context.commit('resetPlan');
    },
  },
};
