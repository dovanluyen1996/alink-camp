export default {
  strict: true,
  namespaced: true,
  state: {
    stack: [],
    searchConditions: {
      prefecture: -1,
      date: '',
      rainy: false,
      temperature: 0,
      wind: false,
      uv: false,
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
      // NOTE: eslintのルールに従うとjsエラーがでるので除外
      // eslint-disable-next-line prefer-object-spread
      const newConditions = Object.assign({ ...state.searchConditions });
      Object.assign(newConditions, conditions);

      state.searchConditions = newConditions;
    },
    resetSearchConditions(state) {
      state.searchConditions = {
        prefecture: -1,
        date: '',
        rainy: false,
        temperature: 0,
        wind: false,
        uv: false,
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
