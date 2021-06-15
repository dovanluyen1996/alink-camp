<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button />
      </div>
      <div class="center">
        {{ notice.title }}
      </div>
    </v-ons-toolbar>
    <v-ons-card>
      <div>
        <div>
          <img :src="notice.image.url">
        </div>
        <div>
          {{ notice.startedAt }}
        </div>
        <div>
          {{ notice.description }}
        </div>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
export default {
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
