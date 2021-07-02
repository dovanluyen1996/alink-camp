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
    validUserCourses: state => state.userCourses.filter(
      // お気に入り登録されている、または今日以降の予定があるuserCourse
      userCourse => userCourse.isFavorited || userCourse.userCoursePlans.filter(
        (userCoursePlan) => {
          const today = moment().startOf('days');
          const targetDate = moment(userCoursePlan.targetAt).startOf('days');

          return targetDate.isSameOrAfter(today);
        },
      ).length,
    ),
    sortedUserCoursePlans: (state, getters) => {
      const userCourses = getters.validUserCourses
      const results = []

      // 予定日を全て表示するために、データ構造を変更する=> {userCourse:, userCoursePlan}
      userCourses.forEach((userCourse) => {
        if(!userCourse.userCoursePlans.length) {
          results.push({ userCourse: userCourse, userCoursePlan: {} });
        }

        userCourse.userCoursePlans.forEach((userCoursePlan) => {
          results.push({ userCourse: userCourse, userCoursePlan: userCoursePlan });
        });
      });

      return results.filter((result) => {
        // 予定日が過去のものは除外する
          const userCoursePlan = result.userCoursePlan;
          const today = moment().startOf('days');
          const targetDate = moment(userCoursePlan.targetAt).startOf('days');

          return targetDate.isSameOrAfter(today);
        }
      ).sort((a, b) => {
        // 予定日があるものが予定日順で、お気に入りより先にソート
        if (a.userCoursePlan.targetAt && b.userCoursePlan.targetAt){
          const aTargetAt = moment(a.userCoursePlan.targetAt).startOf('days');
          const bTargetAt = moment(b.userCoursePlan.targetAt).startOf('days');

          if (aTargetAt.isSame(bTargetAt)) return a.userCourse.isFavorited ? -1 : 1;
          return aTargetAt.isAfter(bTargetAt) ? 1 : -1;

        }else if (!a.userCoursePlan.targetAt ^ !b.userCoursePlan.targetAt){
          return  !a.userCoursePlan.targetAt ? 1 : -1

        }
      });
    }
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
