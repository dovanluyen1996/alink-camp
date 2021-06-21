export default {
  strict: true,
  namespaced: true,
  state: {
    stack: [],
    searchConditions: {
      prefecture: -1,
      date: '',
    },
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
    setSearchConditions(state, conditions) {
      state.searchConditions = conditions;
    },
    resetSearchConditions(state) {
      state.searchConditions = {
        prefecture: -1,
        date: '',
      };
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
