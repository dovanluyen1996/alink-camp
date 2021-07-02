import Vue from 'vue';

export default {
  strict: true,
  namespaced: true,
  state: {
    viewedCourses: [],
  },
  getters: {
    viewedCourses: state => state.viewedCourses,
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
  },
  actions: {
    addViewedCourses(context, course) {
      context.commit('addViewedCourse', course);
    },
    setViewedCoursesByCache(context) {
      // Get viewed courses from Local Storage
      context.commit('setViewedCourses', JSON.parse(localStorage.getItem('viewedCourses')) || []);
    },
  },
};
