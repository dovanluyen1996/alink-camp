import Vue from 'vue';
import ApiClient from '@/api_client';
import moment from 'moment';

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
    favoritedOrHasPlans: state => state.userCourses.filter(
      // お気に入り登録されている、または今日以降の予定があるuserCourse
      userCourse => userCourse.isFavorited || userCourse.userCoursePlans.filter(
        (userCoursePlan) => {
          const today = moment().startOf('days');
          const targetDate = moment(userCoursePlan.targetAt).startOf('days');

          return targetDate.isSameOrAfter(today);
        },
      ).length,
    ),
    onlyFavoritedWithoutPlans: state => state.userCourses.filter(
      // お気に入り登録されている、かつ今日以降の予定日がないuserCourse
      userCourse => userCourse.isFavorited && !userCourse.userCoursePlans.filter(
        (userCoursePlan) => {
          const today = moment().startOf('days');
          const targetDate = moment(userCoursePlan.targetAt).startOf('days');

          return targetDate.isSameOrAfter(today);
        },
      ).length,
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
