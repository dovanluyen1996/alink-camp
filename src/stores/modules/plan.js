import Vue from 'vue';
import moment from 'moment';

export default {
  strict: true,
  namespaced: true,
  state: {
    params: {
      planId: null,
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
    isNew: state => state.params.planId === null,
    dateRange: (state) => {
      const { startedDate, finishedDate } = state.params;
      if (startedDate && finishedDate) {
        return Vue.prototype.$helpers.getDateRange(startedDate, finishedDate);
      }
      if (startedDate) return [startedDate];
      if (finishedDate) return [finishedDate];
      return [];
    },
    inScheduleTasks: (state, getters) => {
      const dateRange = [...getters.dateRange];

      if (dateRange.length === 0) return [];

      const startedDate = dateRange[0];
      const finishedDate = dateRange[dateRange.length - 1];
      const inSchedule = task => moment(task.targetAt).isBetween(`${startedDate} 0:00`, `${finishedDate} 23:59`, null, '[]');

      return state.params.tasks.filter(inSchedule);
    },
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setPlanId(state, planId) {
      Vue.set(state.params, 'planId', planId);
    },
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
    clean(state) {
      const params = {
        planId: null,
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
    setPlanId(context, planId) {
      context.commit('setPlanId', planId);
    },
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
    setItems(context, items) {
      const itemIds = items.map(item => item.id);
      context.commit('setItemIds', itemIds);
    },
    setTasks(context, tasks) {
      context.commit('setTasks', tasks);
    },
    clean(context) {
      context.commit('clean');
    },
    async createPlan({ commit, dispatch, getters }) {
      commit('setIsLoading', true);

      const params = { ...getters.params };
      params.tasks = getters.inScheduleTasks;

      try {
        await dispatch('models/userCampsitePlan/createUserCampsitePlan', params, { root: true });
      } catch (error) {
        commit('api/setError', error, { root: true });
        throw error;
      } finally {
        commit('setIsLoading', false);
      }
    },
    async updatePlan({ commit, dispatch, getters }) {
      commit('setIsLoading', true);

      const params = { ...getters.params };
      params.tasks = getters.inScheduleTasks;

      try {
        await dispatch('models/userCampsitePlan/updateUserCampsitePlan', {
          userCampsitePlanId: params.planId,
          params,
        }, { root: true });
      } catch (error) {
        commit('api/setError', error, { root: true });
        throw error;
      } finally {
        commit('setIsLoading', false);
      }
    },
  },
};
