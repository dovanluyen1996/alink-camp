import settings from '@/config/settings';

export default {
  strict: true,
  namespaced: true,
  state: {
    activeIndex: settings.views.appTabbar.tabIndexes.campsiteWeather,
    lastVisitedAt: null,
  },
  mutations: {
    setActiveIndex(state, index) {
      state.activeIndex = index;
    },
    setActiveIndexFromTabName(state, tabName) {
      state.activeIndex = settings.views.appTabbar.tabIndexes[tabName];
    },
    setLastVisitedAt(state, lastVisitedAt) {
      state.lastVisitedAt = lastVisitedAt;
    },
  },
  actions: {
    setLastVisitedAt(context, lastVisitedAt) {
      context.commit('setLastVisitedAt', lastVisitedAt);
    },
  },
};
