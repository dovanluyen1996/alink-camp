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
    favorited: state => state.userCourses.filter(userCourse => userCourse.isFavorited),
    hasPlanInFuture: (state, getter) => {
      const inFutureUserCourseId = getter.inFuture.map(plan => plan.userCourseId);

      return state.userCourses.filter(userCourse => inFutureUserCourseId.includes(userCourse.id));
    },
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
    allUserCoursePlans: (state, getters) => {
      const userCourses = getters.all;

      return userCourses.map(userCourse => userCourse.userCoursePlans.map(userCoursePlan => ({
        ...userCoursePlan,
      }))).flat();
    },
    inFuture: (state, getters) => getters.allUserCoursePlans.filter(
      userCoursePlan => moment(userCoursePlan.targetAt).startOf('days').isSameOrAfter(moment().startOf('days')),
    ),
    sortedInFuture: (state, getters) => getters.inFuture.sort(
      (a, b) => {
        const userCourse = getters.findByCourseId(a.courseId);
        const aTargetDate = moment(a.targetAt).startOf('days');
        const bTargetDate = moment(b.targetAt).startOf('days');
        let sort = 0;

        sort = aTargetDate.isAfter(bTargetDate) ? 1 : -1;
        if (aTargetDate.isSame(bTargetDate)) sort = userCourse.isFavorited ? -1 : 1;

        return sort;
      },
    ),
    nearestPlan: (state, getters) => (courseId) => {
      const userCourse = getters.findByCourseId(courseId);
      if (!userCourse) return {};

      const userCoursePlans = userCourse.userCoursePlans.slice();
      if (!userCoursePlans) return {};

      const sortedUserCoursePlans = userCoursePlans.sort(
        (a, b) => moment(a.targetAt).valueOf() - moment(b.targetAt).valueOf(),
      );
      const futureUserCoursePlan = sortedUserCoursePlans.find(
        userCoursePlan => moment(userCoursePlan.targetAt).isAfter(moment()),
      );

      return futureUserCoursePlan || {};
    },
    isLoading: state => state.isLoading,
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
    addUserCoursePlan(state, userCoursePlan) {
      const userCourseIndex = state.userCourses.findIndex(
        _userCourse => _userCourse.id === userCoursePlan.userCourseId,
      );
      if (userCourseIndex < 0) return;

      const newUserCourses = state.userCourses.slice();
      const newUserCourse = newUserCourses[userCourseIndex];
      newUserCourse.userCoursePlans.push(userCoursePlan);
      newUserCourses[userCourseIndex] = newUserCourse;

      Vue.set(state, 'userCourses', newUserCourses);
    },
    updateUserCoursePlan(state, userCoursePlan) {
      const userCourseIndex = state.userCourses.findIndex(
        _userCourse => _userCourse.id === userCoursePlan.userCourseId,
      );
      if (userCourseIndex < 0) return;

      const userCourse = state.userCourses[userCourseIndex];
      const userCoursePlanIndex = userCourse.userCoursePlans.findIndex(
        _userCoursePlan => _userCoursePlan.id === userCoursePlan.id,
      );
      if (userCoursePlanIndex < 0) return;

      const newUserCourses = state.userCourses.slice();
      const newUserCourse = newUserCourses[userCourseIndex];
      newUserCourse.userCoursePlans[userCoursePlanIndex] = userCoursePlan;
      newUserCourses[userCourseIndex] = newUserCourse;

      Vue.set(state, 'userCourses', newUserCourses);
    },
    deleteUserCoursePlan(state, userCoursePlan) {
      const userCourseIndex = state.userCourses.findIndex(
        _userCourse => _userCourse.id === userCoursePlan.userCourseId,
      );
      if (userCourseIndex < 0) return;

      const userCourse = state.userCourses[userCourseIndex];
      const userCoursePlanIndex = userCourse.userCoursePlans.findIndex(
        _userCoursePlan => _userCoursePlan.id === userCoursePlan.id,
      );
      if (userCoursePlanIndex < 0) return;

      const newUserCourses = state.userCourses.slice();
      const newUserCourse = newUserCourses[userCourseIndex];
      newUserCourse.userCoursePlans.splice(userCoursePlanIndex, 1);
      newUserCourses[userCourseIndex] = newUserCourse;

      Vue.set(state, 'userCourses', newUserCourses);
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
