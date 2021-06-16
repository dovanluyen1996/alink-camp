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

        // TODO: Update currentUser.ticketCount

        context.commit('addUserGift', userGift);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
