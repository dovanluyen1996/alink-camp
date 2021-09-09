import Vue from 'vue';
import moment from 'moment';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    userCourseResults: [],
    isLoading: false,
  },
  getters: {
    all: state => state.userCourseResults,
    size: state => state.userCourseResults.length,
    findById: state => userCourseResultId => state.userCourseResults.find(
      userCourseResult => userCourseResult.id === userCourseResultId,
    ),
    findByUserCourseId: state => userCourseId => state.userCourseResults.find(
      userCourseResult => userCourseResult.userCourseId === userCourseId,
    ),
    sortByTargetDate: state => state.userCourseResults.sort(
      (a, b) => (moment(a.targetDate).isAfter(b.targetDate) ? -1 : 1),
    ),
    isLoading: state => state.isLoading,
  },
  mutations: {
    setUserCourseResults(state, userCourseResults) {
      Vue.set(state, 'userCourseResults', userCourseResults);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    addUserCourseResult(state, userCourseResult) {
      state.userCourseResults.push(userCourseResult);
    },
    updateUserCourseResult(state, userCourseResult) {
      const index = state.userCourseResults.findIndex(
        _userCourseResult => _userCourseResult.id === userCourseResult.id,
      );

      if (index < 0) return;

      Vue.set(state.userCourseResults, index, userCourseResult);
    },
    deleteUserCourseResult(state, userCourseResult) {
      const index = state.userCourseResults.findIndex(
        _userCourseResult => _userCourseResult.id === userCourseResult.id,
      );

      if (index < 0) return;

      Vue.delete(state.userCourseResults, index);
    },
  },
  actions: {
    async getUserCourseResults(context, userCourseId) {
      context.commit('setIsLoading', true);

      try {
        const res = await ApiClient.getUserCourseResults(userCourseId);

        context.commit('setUserCourseResults', res);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async createUserCourseResult(context, { userCourseId, params }) {
      context.commit('setIsLoading', true);

      try {
        const res = await ApiClient.createUserCourseResult(userCourseId, params);

        context.commit('addUserCourseResult', res);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUserCourseResult(context, { userCourseId, userCourseResultId, params }) {
      context.commit('setIsLoading', true);

      try {
        const res = await ApiClient.updateUserCourseResult(
          userCourseId, userCourseResultId, params,
        );

        context.commit('updateUserCourseResult', res);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async destroyUserCourseResult(context, { userCourseId, userCourseResultId }) {
      context.commit('setIsLoading', true);

      try {
        const res = await ApiClient.destroyUserCourseResult(userCourseId, userCourseResultId);

        context.commit('deleteUserCourseResult', res);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
