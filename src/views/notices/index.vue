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
  data() {
    return {
      notices: [
        {
          id: 1,
          title: 'Notice 1',
          description: 'Notice 1',
          image: 'https://via.placeholder.com/150',
          started_at: '2020-02-02 11:11',
        },
        {
          id: 2,
          title: 'Notice 2',
          description: 'Notice 2',
          image: 'https://via.placeholder.com/150',
          started_at: '2020-02-03 11:11',
        },
        {
          id: 3,
          title: 'Notice 2',
          description: 'Notice 2',
          image: 'https://via.placeholder.com/150',
          started_at: '2020-02-04 11:11',
        },
      ],
    };
  },
  methods: {
    showNotice(id) {
      this.$store.dispatch('menuNavigator/push', {
        extends: ShowNoticeView,
        data() {
          return {
            id,
          };
        },
      });
    },
  },
};
</script>
