<template>
  <v-ons-card fullscreen>
    <div class="content">
      <div class="notice-detail">
        <img
          v-if="notice.image.url"
          :src="notice.image.url"
          class="notice-detail__thumbnail"
        >
        <span class="notice-detail__started-at">{{ notice.startedAt }}</span>
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="notice-detail__description"
          v-html="notice.description"
        />
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </div>
  </v-ons-card>
</template>

<script>
export default {
  name: 'NoticeDetail',
  props: {
    notice: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.notice-detail {
  &__thumbnail {
    width: 100%;
    height: 206px;
    margin-top: 5px;
    margin-bottom: 20px;
    border-radius: 10px;
    object-fit: cover;
  }

  &__started-at {
    display: block;
    margin-bottom: 20px;
    font-size: $font-size-small;
    font-weight: 300;
    line-height: 1;
    color: $color-subtext;
    text-align: right;
  }

  &__description {
    display: block;
    font-weight: 300;
    line-height: 1.7;
    white-space: pre-line;
  }
}
</style>
