import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    userGifts: [],
    isLoading: false,
  },
  getters: {
    all: state => state.userGifts,
    findById: state => userGiftId => state.userGifts.find(userGift => userGift.id === userGiftId),
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
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
