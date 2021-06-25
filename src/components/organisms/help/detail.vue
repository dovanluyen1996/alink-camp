<template>
  <v-ons-card fullscreen>
    <div class="content">
      <div class="help-detail">
        <img
          v-if="help.image.url"
          :src="help.image.url"
          class="help-detail__thumbnail"
        >
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="help-detail__description"
          v-html="help.description"
        />
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </div>
  </v-ons-card>
</template>

<script>
export default {
  name: 'HelpDetail',
  props: {
    help: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.help-detail {
  &__thumbnail {
    width: 100%;
    height: 206px;
    margin-top: 5px;
    margin-bottom: 20px;
    border-radius: 10px;
    object-fit: cover;
  }

  &__description {
    display: block;
    font-weight: 300;
    line-height: 1.7;
    white-space: pre-line;
  }
}
</style>
