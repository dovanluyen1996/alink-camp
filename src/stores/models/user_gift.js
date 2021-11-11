import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    userGifts: [],
    isLoading: false,
  },
  getters: {
    findByGiftId: state => giftId => state.userGifts.find(
      userGift => userGift.giftId === giftId,
    ),
    isLoading: state => state.isLoading,
  },
  mutations: {
    setUserGifts(state, userGifts) {
      state.userGifts = userGifts;
    },
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
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getUserGifts(context) {
      context.commit('setIsLoading', true);

      try {
        const userGifts = await ApiClient.getUserGifts();

        context.commit('setUserGifts', userGifts);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
