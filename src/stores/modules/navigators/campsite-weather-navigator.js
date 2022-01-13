export default {
  strict: true,
  namespaced: true,
  state: {
    stack: [],
    isBusy: false,
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
    clear(state) {
      state.stack = [];
    },
    setIsBusy(state, isBusy) {
      state.isBusy = isBusy;
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
    clear({ commit }) {
      commit('clear');
    },
  },
};
