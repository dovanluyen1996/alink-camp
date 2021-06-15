import Vue from 'vue';
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
    findById: state => userCourseResultId => state.userCourseResults.find(
      userCourseResult => userCourseResult.id === userCourseResultId,
    ),
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
      const userCourseResultTarget = state.userCourseResults.find(
        _userCourseResult => _userCourseResult.id === userCourseResult.id,
      );

      if (userCourseResultTarget === undefined) return;

      Object.assign(userCourseResultTarget, userCourseResult);
    },
    deleteUserCourseResult(state, userCourseResult) {
      const index = state.userCourseResults.findIndex(
        _userCourseResult => _userCourseResult.id === userCourseResult.id,
      );

      if (index < 0) return;

      state.userCourseResults.splice(index, 1);
    },
  },
  actions: {
    async getUserCourseResults(context) {
      context.commit('setIsLoading', true);

      try {
        const res = await ApiClient.getUserCourseResults();

        context.commit('setUserCourseResults', res);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async createUserCourseResult(context, userCourseResult) {
      context.commit('setIsLoading', true);

      try {
        const res = await ApiClient.createUserCourseResult(userCourseResult);

        context.commit('addUserCourseResult', res);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUserCourseResult(context, payload) {
      context.commit('setIsLoading', true);

      try {
        const res = await ApiClient.updateUserCourseResult(payload.userCourseResult.id, payload);

        context.commit('updateUserCourseResult', res);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async destroyUserCourseResult(context, userCourseResultId) {
      context.commit('setIsLoading', true);

      try {
        const res = await ApiClient.destroyUserCourseResult(userCourseResultId);

        context.commit('deleteUserCourseResult', res);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
