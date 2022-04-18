import Vue from 'vue';
import moment from 'moment';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    userCampsitePlans: [],
    isLoading: false,
  },
  getters: {
    isLoading: state => state.isLoading,
    all: state => state.userCampsitePlans,
    findById: state => userCampsitePlanId => state.userCampsitePlans.find(
      userCampsitePlan => userCampsitePlan.id === userCampsitePlanId,
    ),
    inFuture: state => (object = {}) => {
      let plans = state.userCampsitePlans.filter(
        userCampsitePlan => moment(userCampsitePlan.finishedDate).startOf('days').isSameOrAfter(moment().startOf('days')),
      );

      if (object.campsiteId) plans = plans.filter(plan => plan.campsite.id === object.campsiteId);

      return plans;
    },
    inPast: state => (object = {}) => {
      let plans = state.userCampsitePlans.filter(
        userCampsitePlan => moment(userCampsitePlan.finishedDate).startOf('days').isBefore(moment().startOf('days')),
      );

      if (object.campsiteId) plans = plans.filter(plan => plan.campsite.id === object.campsiteId);

      return plans;
    },
  },
  mutations: {
    setUserCampsitePlans(state, userCampsitePlans) {
      const partition = ([updatePlans, addPlans], plan) => {
        const index = state.userCampsitePlans.findIndex(currentPlan => currentPlan.id === plan.id);

        if (index < 0) {
          addPlans.push(plan);
        } else {
          updatePlans.push({ index, plan });
        }

        return [updatePlans, addPlans];
      };

      const [updatePlans, addPlans] = userCampsitePlans.reduce(partition, [[], []]);

      // update plans
      updatePlans.forEach((object) => {
        Vue.set(state.userCampsitePlans, object.index, object.plan);
      });

      // add plans
      addPlans.forEach((plan) => {
        state.userCampsitePlans.push(plan);
      });
    },
    setUserCampsitePlan(state, userCampsitePlan) {
      const index = state.userCampsitePlans.findIndex(
        _userCampsitePlan => _userCampsitePlan.id === userCampsitePlan.id,
      );

      if (index < 0) return;

      Vue.set(state.userCampsitePlans, index, userCampsitePlan);
    },
    addUserCampsitePlan(state, userCampsitePlan) {
      state.userCampsitePlans.push(userCampsitePlan);
    },
    updateUserCampsitePlan(state, userCampsitePlan) {
      const index = state.userCampsitePlans.findIndex(
        _userCampsitePlan => _userCampsitePlan.id === userCampsitePlan.id,
      );

      if (index < 0) return;

      Vue.set(state.userCampsitePlans, index, userCampsitePlan);
    },
    deleteUserCampsitePlan(state, userCampsitePlan) {
      const index = state.userCampsitePlans.findIndex(
        _userCampsitePlan => _userCampsitePlan.id === userCampsitePlan.id,
      );

      if (index < 0) return;

      Vue.delete(state.userCampsitePlans, index);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getUserCampsitePlans(context, params) {
      context.commit('setIsLoading', true);

      try {
        const userCampsitePlans = await ApiClient.getUserCampsitePlans(params);

        context.commit('setUserCampsitePlans', userCampsitePlans);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getUserCampsitePlan(context, { userCampsitePlanId }) {
      context.commit('setIsLoading', true);

      try {
        const userCampsitePlan = await ApiClient.getUserCampsitePlan(userCampsitePlanId);

        context.commit('setUserCampsitePlan', userCampsitePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async createUserCampsitePlan(context, params) {
      context.commit('setIsLoading', true);

      try {
        const userCampsitePlan = await ApiClient.createUserCampsitePlan(params);

        context.commit('addUserCampsitePlan', userCampsitePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUserCampsitePlan(context, { userCampsitePlanId, params }) {
      context.commit('setIsLoading', true);

      try {
        const userCampsitePlan = await ApiClient.updateUserCampsitePlan(userCampsitePlanId, params);

        context.commit('updateUserCampsitePlan', userCampsitePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async deleteUserCampsitePlan(context, { userCampsitePlanId }) {
      context.commit('setIsLoading', true);

      try {
        const userCampsitePlan = await ApiClient.deleteUserCampsitePlan(userCampsitePlanId);

        context.commit('deleteUserCampsitePlan', userCampsitePlan);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
