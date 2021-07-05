import Vue from 'vue';
import ApiClient from '@/api_client';
import moment from 'moment';

export default {
  strict: true,
  namespaced: true,
  state: {
    userCoursePlans: [],
    isLoading: false,
  },
  getters: {
    sortedUserCoursePlans: (state, getters, rootState, rootGetters) => {
      // 予定日を全てを取得する
      const userCourses = rootGetters['models/userCourse/favoritedOrHasPlans'];
      const userCoursePlans = [];

      userCourses.forEach((userCourse) => {
        if (userCourse.userCoursePlans.length !== 0) {
          userCourse.userCoursePlans.forEach((userCoursePlan) => {
            userCoursePlans.push(userCoursePlan);
          });
        }
      });

      return userCoursePlans.filter((userCoursePlan) => {
        // 予定日が過去のものは除外する
        const targetDate = moment(userCoursePlan.targetAt).startOf('days');
        const today = moment().startOf('days');

        return targetDate.isSameOrAfter(today);
      }).sort((a, b) => {
        let sort = 0;

        // 予定日順でソート
        const aTargetAt = moment(a.targetAt).startOf('days');
        const bTargetAt = moment(b.targetAt).startOf('days');

        // 予定日が同じ場合はお気に入りを先にする
        if (aTargetAt.isSame(bTargetAt)) {
          const aUserCourse = rootGetters['models/userCourse/findById'](a.userCourseId);
          sort = aUserCourse.isFavorited ? -1 : 1;
        } else {
          sort = aTargetAt.isAfter(bTargetAt) ? 1 : -1;
        }

        return sort;
      });
    },
  },
  mutations: {
    addUserCoursePlan(state, userCoursePlan) {
      state.userCoursePlans.push(userCoursePlan);
    },
    updateUserCoursePlan(state, userCoursePlan) {
      const index = state.userCoursePlans.findIndex(
        _userCoursePlan => _userCoursePlan.id === userCoursePlan.id,
      );
      if (index < 0) return;

      Vue.set(state.userCoursePlans, index, userCoursePlan);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async createUserCoursePlan(context, { userCourseId, params }) {
      context.commit('setIsLoading', true);

      try {
        const userCoursePlan = await ApiClient.createUserCoursePlan(userCourseId, params);

        context.commit('addUserCoursePlan', userCoursePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUserCoursePlan(context, { userCourseId, userCoursePlanId, params }) {
      context.commit('setIsLoading', true);

      try {
        const userCoursePlan = await ApiClient.updateUserCoursePlan(
          userCourseId, userCoursePlanId, params,
        );

        context.commit('updateUserCoursePlan', userCoursePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
