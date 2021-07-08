export default {
  strict: true,
  namespaced: true,
  state: {
    stack: [],
    // TODO: 天気APIの仕様がわからないためダミーデータなので変更してください
    areaSearchConditions: {
      prefecture: -1,
      date: '',
      sunny: false,
      temperature: 0,
      wind: false,
      uv: false,
      distance: -1,
    },
    locationSearchConditions: {
      prefecture: -1,
      date: '',
      sunny: false,
      temperature: 0,
      wind: false,
      uv: false,
      distance: -1,
      lat: null,
      lon: null,
      lower_rad: null,
      upper_rad: null,
    },
    searched: false,
    activeIndex: 0,
  },
  mutations: {
    push(state, page) {
      state.stack.push(page);
    },
    pop(state) {
      if (state.stack.length > 1) {
        state.stack.pop();
      }
    },
    replace(state, page) {
      state.stack.pop();
      state.stack.push(page);
    },
    reset(state, page) {
      state.stack = [page || state.stack[0]];
    },
    setAreaSearchConditions(state, conditions) {
      const newConditions = {};
      Object.assign(newConditions, state.areaSearchConditions);
      Object.assign(newConditions, conditions);

      state.areaSearchConditions = newConditions;
    },
    setLocationSearchConditions(state, conditions) {
      const newConditions = {};
      Object.assign(newConditions, state.locationSearchConditions);
      Object.assign(newConditions, conditions);

      state.locationSearchConditions = newConditions;
    },
    resetAreaSearchConditions(state) {
      state.areaSearchConditions = {
        prefecture: -1,
        date: '',
        sunny: false,
        temperature: 0,
        wind: false,
        uv: false,
        distance: -1,
      };
    },
    resetLocationSearchConditions(state) {
      state.locationSearchConditions = {
        prefecture: -1,
        date: '',
        sunny: false,
        temperature: 0,
        wind: false,
        uv: false,
        distance: -1,
        lat: null,
        lon: null,
        lower_rad: null,
        upper_rad: null,
      };
    },
    setSearched(state, searched) {
      state.searched = searched;
    },
    resetSearched(state) {
      state.searched = false;
    },
    setActiveIndex(state, activeIndex) {
      state.activeIndex = activeIndex;
    },
    resetActiveIndex(state) {
      state.activeIndex = 0;
    },
  },
  actions: {
    push({ commit }, page) {
      commit('push', page);
    },
    pop({ commit }) {
      commit('pop');
    },
    replace({ commit }, page) {
      commit('replace', page);
    },
    reset({ commit }, page) {
      commit('reset', page);
    },
  },
};
