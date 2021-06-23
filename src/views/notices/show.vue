<template>
  <v-ons-page>
    <custom-toolbar :title="notice.title" />

    <div class="content">
      <notice-detail :notice="notice" />
    </div>
  </v-ons-page>
</template>

<script>
import NoticeDetail from '@/components/organisms/notice/detail';

export default {
  components: {
    NoticeDetail,
  },
  props: {
    noticeId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    notice() {
      return this.$store.getters['models/notice/findById'](this.noticeId);
    },
  },
  created() {
    this.read();
  },
  methods: {
    read() {
      this.$store.dispatch('models/notice/readNotice', this.notice);
    },
  },
};
</script>
