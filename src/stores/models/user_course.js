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
    findByCourseId: state => courseId => state.userCourses.find(
      userCourse => userCourse.courseId === courseId,
    ),
    validUserCourses: state => state.userCourses.filter(
      userCourse => userCourse.isFavorited || userCourse.userCoursePlans.filter(function (userCoursePlan) {
        const today = new Date(2021, 7 - 1, 1);
        const targetAt = new Date(userCoursePlan.targetAt);
        const targetDate = new Date(targetAt.getFullYear(), targetAt.getMonth(), targetAt.getDay());

        console.log(userCoursePlan);
        console.log(targetDate);
        console.log(today);
        console.log(targetDate.getTime() >= today.getTime());
        return targetDate.getTime() >= today.getTime();
      }).length
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
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async createUserCourse(context, params) {
      context.commit('setIsLoading', true);

      try {
        const userCourse = await ApiClient.createUserCourse(params);

        context.commit('addUserCourse', userCourse);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUserCourse(context, { userCourseId, params }) {
      context.commit('setIsLoading', true);

      try {
        const userCourse = await ApiClient.updateUserCourse(userCourseId, params);

        context.commit('updateUserCourse', userCourse);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
