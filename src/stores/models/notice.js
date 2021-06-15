import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    notices: [],
    isLoading: false,
  },
  getters: {
    all: state => state.notices,
    findById: state => noticeId => state.notices.find(notice => notice.id === noticeId),
  },
  mutations: {
    setNotices(state, notices) {
      Vue.set(state, 'notices', notices);
    },
    setIsLoading(state, isLoading) {
      Vue.set(state, 'isLoading', isLoading);
    },
    updateNotice(state, notice) {
      const index = state.notices.findIndex(_notice => _notice.id === notice.id);
      if (index < 0) return;
      Vue.set(state.notices, index, notice);
    },
  },
  actions: {
    async getNotices(context) {
      context.commit('setIsLoading', true);

      try {
        const notices = await ApiClient.getNotices();
        const readNoticeIds = JSON.parse(localStorage.getItem('readNoticeIds')) || [];
        notices.forEach((notice) => { notice.isRead = readNoticeIds.includes(notice.id); });

        context.commit('setNotices', notices);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    readNotice(context, notice) {
      if (!notice) return;

      const targetNotice = { ...notice, isRead: true };
      context.commit('updateNotice', targetNotice);
      context.dispatch('setReadNoticeIds', [notice.id]);
    },
    setReadNoticeIds(_context, noticeIds) {
      const readNoticeIds = JSON.parse(localStorage.getItem('readNoticeIds')) || [];
      let ids = [...readNoticeIds, ...noticeIds];
      ids = [...new Set(ids)];

      localStorage.setItem('readNoticeIds', JSON.stringify(ids));
    },
  },
};
