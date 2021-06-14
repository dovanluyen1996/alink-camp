<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button />
      </div>
      <div class="center">
        お知らせ
      </div>
    </v-ons-toolbar>
    <v-ons-card>
      <v-ons-list>
        <v-ons-list-item
          v-for="notice in notices"
          :key="notice.id"
          @click="showNotice(notice.id)"
        >
          <div>
            <p>{{ notice.startedAt }}</p>
            <p>{{ notice.title }}</p>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import ShowNoticeView from '@/views/notices/show';

export default {
  computed: {
    notices() {
      return this.$store.getters['models/notice/all'];
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
