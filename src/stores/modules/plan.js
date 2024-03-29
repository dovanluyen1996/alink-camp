import Vue from 'vue';
import moment from 'moment';

const LOCAL_STORAGE_KEY_CHECKED_ITEM_IDS = 'checkedItemIds';

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
      memories: [],
    },
    isLoading: false,
  },
  getters: {
    params: state => state.params,
    isLoading: state => state.isLoading,
    dateRange: (state) => {
      const { startedDate, finishedDate } = state.params;
      if (startedDate && finishedDate) {
        return Vue.prototype.$helpers.getDateRange(startedDate, finishedDate);
      }
      if (startedDate) return [startedDate];
      if (finishedDate) return [finishedDate];
      return [];
    },
    pastDates: (state, getters) => {
      const dateRange = [...getters.dateRange];
      const today = moment();

      return dateRange.filter(date => moment(date).isBefore(today, 'day'));
    },
    inScheduleTasks: (state, getters) => {
      const dateRange = [...getters.dateRange];

      if (dateRange.length === 0) return [];

      const startedDate = dateRange[0];
      const finishedDate = dateRange[dateRange.length - 1];
      const inSchedule = task => moment(task.targetAt).isBetween(`${startedDate} 00:00`, `${finishedDate} 23:59`, null, '[]');

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
    setMemories(state, memories) {
      Vue.set(state.params, 'memories', memories);
    },
    clean(state) {
      const params = {
        planId: null,
        campsiteId: null,
        startedDate: '',
        finishedDate: '',
        itemIds: [],
        tasks: [],
        memories: [],
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
    setMemories(context, memories) {
      context.commit('setMemories', memories);
    },
    clean(context) {
      context.commit('clean');
    },
    storeCheckedItem(_context, itemIds) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY_CHECKED_ITEM_IDS, JSON.stringify(itemIds));
      } catch (error) {
        // 保存できなくても処理を続行する
        console.error('itemIds store error.', error);
      }
    },
    restoreCheckedItem({ dispatch }, items) {
      try {
        const ids = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CHECKED_ITEM_IDS));
        const storedIds = ids || [];

        const validItems = items || [];
        const validIds = validItems.map(item => item.id);
        const itemIds = storedIds.filter(id => validIds.includes(id));

        dispatch('setItemIds', itemIds);
      } catch (error) {
        // 復元できなくても処理を続行する
        console.error('itemIds restore error.', error);
      }
    },
    async createPlan({ commit, dispatch, getters }) {
      commit('setIsLoading', true);

      const params = { ...getters.params };
      params.tasks = getters.inScheduleTasks;

      try {
        await dispatch('models/userCampsitePlan/createUserCampsitePlan', params, { root: true });
        dispatch('storeCheckedItem', params.itemIds);
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

      params.memories = params.memories.filter(memory => memory.image.url === undefined);

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
