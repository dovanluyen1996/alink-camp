import settings from '@/config/settings';

export default {
  strict: true,
  namespaced: true,
  state: {
    activeIndex: settings.views.appTabbar.tabIndexes.courseWeather,
  },
  mutations: {
    setActiveIndex(state, index) {
      state.activeIndex = index;
    },
    setActiveIndexFromTabName(state, tabName) {
      state.activeIndex = settings.views.appTabbar.tabIndexes[tabName];
    },
  },
};
