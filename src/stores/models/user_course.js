import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    userCourses: [],
    isLoading: false,
  },
  getters: {
    all: state => state.userCourses,
    findById: state => userCourseId => state.userCourses.find(
      userCourse => userCourse.id === userCourseId,
    ),
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setUserCourses(state, userCourses) {
      Vue.set(state, 'userCourses', userCourses);
    },
    addUserCourse(state, userCourse) {
      state.userCourses.push(userCourse);
    },
    updateUserCourse(state, userCourse) {
      const index = state.userCourses.findIndex(_userCourse => _userCourse.id === userCourse.id);
      if (index < 0) return;

      Vue.set(state.userCourses, index, userCourse);
    },
  },
  actions: {
    async getUserCourses(context) {
      context.commit('setIsLoading', true);

      try {
        const userCourses = await ApiClient.getUserCourses();

        context.commit('setUserCourses', userCourses);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async createUserCourse(context, params) {
      context.commit('setIsLoading', true);

      try {
        const userCourse = await ApiClient.createUserCourse(params);

        context.commit('addUserCourse', userCourse);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUserCourse(context, { userCourseId, params }) {
      context.commit('setIsLoading', true);

      try {
        const userCourse = await ApiClient.updateUserCourse(userCourseId, params);

        context.commit('updateUserCourse', userCourse);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};