<template>
  <v-ons-page>
    <custom-toolbar title="お知らせ" />
    <loading :visible="isLoading" />
    <div class="content">
      <notice-list
        v-if="notices.length > 0"
        :notices="notices"
        @click="showNotice"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoticeList from '@/components/organisms/notice/list';

// views
import ShowNoticeView from '@/views/notices/show';

export default {
  name: 'NoticesIndex',
  components: {
    NoticeList,
  },
  computed: {
    notices() {
      return this.$store.getters['models/notice/all'];
    },
    isLoading() {
      return this.$store.getters['models/notice/isLoading'];
    },
  },
  async created() {
    await this.getNotices();
  },
  methods: {
    showNotice(noticeId) {
      this.$store.dispatch('menuNavigator/push', {
        extends: ShowNoticeView,
        onsNavigatorProps: {
          noticeId,
        },
      });
    },
    async getNotices() {
      await this.$store.dispatch('models/notice/getNotices');
    },
  },
};
</script>
