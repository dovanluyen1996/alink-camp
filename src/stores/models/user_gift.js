import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    userGifts: [],
    isLoading: false,
  },
  mutations: {
    addUserGift(state, userGift) {
      state.userGifts.push(userGift);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async createUserGift(context, params) {
      context.commit('setIsLoading', true);

      try {
        const userGift = await ApiClient.createUserGift(params);

        context.commit('addUserGift', userGift);
        context.dispatch('models/currentUser/getUser', null, { root: true });

        return true;
      } catch (error) {
        context.commit('api/setError', error, { root: true });

        return false;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
