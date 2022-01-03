import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    item: {},
    items: [],
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setItems(state, items) {
      Vue.set(state, 'items', items);
    },
    setItem(state, item) {
      Vue.set(state, 'item', item);

      const index = state.items.findIndex(_item => _item.id === item.id);
      if (index < 0) return;

      Vue.set(state.items, index, item);
    },
    addItem(state, item) {
      state.items.push(item);
    },
    updateItem(state, item) {
      const index = state.items.findIndex(_item => _item.id === item.id);
      if (index < 0) return;

      Vue.set(state.items, index, item);
    },
    deleteItem(state, item) {
      const index = state.items.findIndex(
        _item => _item.id === item.id,
      );

      if (index < 0) return;

      Vue.delete(state.items, index);
    },
  },
  actions: {
    async getItems(context) {
      context.commit('setIsLoading', true);

      try {
        const items = await ApiClient.getItems();

        context.commit('setItems', items);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getItem(context, { itemId }) {
      context.commit('setIsLoading', true);

      try {
        const item = await ApiClient.getItem(itemId);

        context.commit('setItem', item);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async createItem(context, params) {
      context.commit('setIsLoading', true);

      try {
        const item = await ApiClient.createItem(params);

        context.commit('addItem', item);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateItem(context, { itemId, params }) {
      context.commit('setIsLoading', true);

      try {
        const item = await ApiClient.updateItem(itemId, params);

        context.commit('updateItem', item);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async deleteItem(context, { itemId }) {
      context.commit('setIsLoading', true);

      try {
        const item = await ApiClient.deleteItem(itemId);

        context.commit('deleteItem', item);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
