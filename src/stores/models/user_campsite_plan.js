import Vue from 'vue';
import moment from 'moment';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    userCampsitePlans: [],
    isLoading: false,
  },
  getters: {
    isLoading: state => state.isLoading,
    all: state => state.userCampsitePlans,
    inFuture: state => state.userCampsitePlans.filter(
      userCampsitePlan => moment(userCampsitePlan.finishedDate).startOf('days').isSameOrAfter(moment().startOf('days')),
    ),
    inPast: state => state.userCampsitePlans.filter(
      userCampsitePlan => moment(userCampsitePlan.finishedDate).startOf('days').isBefore(moment().startOf('days')),
    ),
  },
  mutations: {
    setUserCampsitePlans(state, userCampsitePlans) {
      Vue.set(state, 'userCampsitePlans', userCampsitePlans);
    },
    setUserCampsitePlan(state, userCampsitePlan) {
      const index = state.userCampsitePlans.findIndex(
        _userCampsitePlan => _userCampsitePlan.id === userCampsitePlan.id,
      );

      if (index < 0) return;

      Vue.set(state.userCampsitePlans, index, userCampsitePlan);
    },
    addUserCampsitePlan(state, userCampsitePlan) {
      state.userCampsitePlans.push(userCampsitePlan);
    },
    updateUserCampsitePlan(state, userCampsitePlan) {
      const index = state.userCampsitePlans.findIndex(
        _userCampsitePlan => _userCampsitePlan.id === userCampsitePlan.id,
      );

      if (index < 0) return;

      Vue.set(state.userCampsitePlans, index, userCampsitePlan);
    },
    deleteUserCampsitePlan(state, userCampsitePlan) {
      const index = state.userCampsitePlans.findIndex(
        _userCampsitePlan => _userCampsitePlan.id === userCampsitePlan.id,
      );

      if (index < 0) return;

      Vue.delete(state.userCampsitePlans, index);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getUserCampsitePlans(context, params) {
      context.commit('setIsLoading', true);

      try {
        const userCampsitePlans = await ApiClient.getUserCampsitePlans(params);

        context.commit('setUserCampsitePlans', userCampsitePlans);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getUserCampsitePlan(context, { userCampsitePlanId }) {
      context.commit('setIsLoading', true);

      try {
        const userCampsitePlan = await ApiClient.getUserCampsitePlan(userCampsitePlanId);

        context.commit('setUserCampsitePlan', userCampsitePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async createUserCampsitePlan(context, params) {
      context.commit('setIsLoading', true);

      try {
        const userCampsitePlan = await ApiClient.createUserCampsitePlan(params);

        context.commit('addUserCampsitePlan', userCampsitePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUserCampsitePlan(context, { userCampsitePlanId, params }) {
      context.commit('setIsLoading', true);

      try {
        const userCampsitePlan = await ApiClient.updateUserCampsitePlan(userCampsitePlanId, params);

        context.commit('updateUserCampsitePlan', userCampsitePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async deleteUserCampsitePlan(context, { userCampsitePlanId }) {
      context.commit('setIsLoading', true);

      try {
        const userCampsitePlan = await ApiClient.deleteUserCampsitePlan(userCampsitePlanId);

        context.commit('deleteUserCampsitePlan', userCampsitePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
