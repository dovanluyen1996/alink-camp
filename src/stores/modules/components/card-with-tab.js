export default {
  strict: true,
  namespaced: true,
  state: {
    activeIndex: 0,
    showCourseActiveIndex: 0,
    searchCourseActiveIndex: 0,
    aboutSubscriptionActiveIndex: 0,
    showCampsiteActiveIndex: 0,
  },
  getters: {
    activeIndex: state => state.activeIndex,
  },
  mutations: {
    setActiveIndex(state, activeIndex) {
      state.activeIndex = activeIndex;
    },
    setShowCampsiteActiveIndex(state, activeIndex) {
      state.showCampsiteActiveIndex = activeIndex;
    },
    setSearchCourseActiveIndex(state, activeIndex) {
      state.searchCourseActiveIndex = activeIndex;
    },
    setAboutSubscriptionActiveIndex(state, activeIndex) {
      state.aboutSubscriptionActiveIndex = activeIndex;
    },
    resetActiveIndex(state) {
      state.activeIndex = 0;
    },
    resetShowCampsiteActiveIndex(state) {
      state.showCourseActiveIndex = 0;
    },
    resetSearchCourseActiveIndex(state) {
      state.searchCourseActiveIndex = 0;
    },
    resetAboutSubscriptionActiveIndex(state) {
      state.aboutSubscriptionActiveIndex = 0;
    },
  },
};
