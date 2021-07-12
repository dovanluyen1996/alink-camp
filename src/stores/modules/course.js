import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    viewedCourses: [],
    choosenCourse: {},
    isLoading: false,
    areaSearchConditions: {
      prefecture: -1,
    },
    locationSearchConditions: {
      distance: -1,
    },
    searched: false,
    activeIndex: 0,
  },
  getters: {
    viewedCourses: state => state.viewedCourses,
    choosenCourse: state => state.choosenCourse,
  },
  mutations: {
    setViewedCourses(state, courses) {
      Vue.set(state, 'viewedCourses', courses);
    },
    addViewedCourse(state, course) {
      // If exsited viewed, don't add course to Store
      const exsitedViewedCourseIndex = state.viewedCourses.findIndex(
        _viewed => _viewed.id === course.id,
      );

      // If exsited in Viewed Courses
      if (exsitedViewedCourseIndex > 0) {
        Vue.delete(state.viewedCourses, exsitedViewedCourseIndex);
      }

      // 閲覧履歴 will show 5 items, therefore if current 閲覧履歴 is 5, delete the first item
      state.viewedCourses.push(course);

      const removeCount = state.viewedCourses.length - 5;
      state.viewedCourses.splice(0, removeCount);

      // Update 閲覧履歴 local storage
      localStorage.setItem('viewedCourses', JSON.stringify(state.viewedCourses));
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setChoosenCourse(state, course) {
      Vue.set(state, 'choosenCourse', course);
    },
    setAreaSearchConditions(state, conditions) {
      const newConditions = {};
      Object.assign(newConditions, state.areaSearchConditions);
      Object.assign(newConditions, conditions);

      Vue.set(state, 'areaSearchConditions', newConditions);
    },
    setLocationSearchConditions(state, conditions) {
      const newConditions = {};
      Object.assign(newConditions, state.locationSearchConditions);
      Object.assign(newConditions, conditions);

      Vue.set(state, 'locationSearchConditions', newConditions);
    },
    resetAreaSearchConditions(state) {
      Vue.set(state, 'areaSearchConditions', {
        prefecture: -1,
      });
    },
    resetLocationSearchConditions(state) {
      Vue.set(state, 'locationSearchConditions', {
        distance: -1,
      });
    },
    setSearched(state, searched) {
      state.searched = searched;
    },
    setActiveIndex(state, activeIndex) {
      state.activeIndex = activeIndex;
    },
    resetActiveIndex(state) {
      state.activeIndex = 0;
    },
  },
  actions: {
    addViewedCourses(context, course) {
      context.commit('addViewedCourse', course);
    },
    setViewedCoursesByCache(context) {
      // Get viewed courses from Local Storage
      context.commit('setViewedCourses', JSON.parse(localStorage.getItem('viewedCourses')) || []);
    },
    setChoosenCourse(context, course) {
      context.commit('setChoosenCourse', course);
    },
    async getChoosenCourse(context, courseId) {
      context.commit('setIsLoading', true);

      try {
        const course = await ApiClient.getCourse(courseId);

        context.commit('setChoosenCourse', course);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
