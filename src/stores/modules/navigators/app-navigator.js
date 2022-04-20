export default {
  strict: true,
  namespaced: true,
  state: {
    stack: [],
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
    reset(context, page) {
      context.dispatch('clear');
      context.commit('reset', page);
    },
    clear(context) {
      context.commit('clear');
      context.commit('appTabbar/setActiveIndex', 0, { root: true });
      context.dispatch('campsiteWeatherNavigator/clear', null, { root: true });
      context.dispatch('campsiteSearchNavigator/clear', null, { root: true });
      context.dispatch('menuNavigator/clear', null, { root: true });
      context.dispatch('plansNavigator/clear', null, { root: true });
      context.dispatch('spotSearchNavigator/clear', null, { root: true });
    },
  },
};
