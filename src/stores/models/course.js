import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    courses: [],
    isLoading: false,
  },
  getters: {
    all: state => state.courses,
    size: state => state.courses.length,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setCourses(state, courses) {
      Vue.set(state, 'courses', courses);
    },
    setViewedCourses(state, courses) {
      Vue.set(state, 'viewedCourses', courses);
    },
    addViewedCourse(state, course) {
      // If exsited viewed, don't add course to Store
      const exsitedViewedCourse = state.viewedCourses.find(viewed => viewed.id === course.id);
      if (exsitedViewedCourse) return;

      // 閲覧履歴 will show 5 items, therefore if current 閲覧履歴 is 5, delete the first item
      if (state.viewedCourses.length === 5) {
        state.viewedCourses.splice(0, 1);
      }
      state.viewedCourses.push(course);

      // Update 閲覧履歴 local storage
      localStorage.setItem('viewedCourses', JSON.stringify(state.viewedCourses));
    },
  },
  actions: {
    async getCourses(context, params) {
      context.commit('setIsLoading', true);

      try {
        const courses = await ApiClient.getCourses(params);

        context.commit('setCourses', courses);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    resetCourses(context) {
      context.commit('setCourses', []);
    },
    addViewedCourses(context, course) {
      context.commit('addViewedCourse', course);
    },
    getViewedCourses(context) {
      // Get viewed courses from Local Storage
      context.commit('setViewedCourses', JSON.parse(localStorage.getItem('viewedCourses')) || []);
    },
  },
};
