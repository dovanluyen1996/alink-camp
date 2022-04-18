<template>
  <content-with-footer>
    <img
      :src="image"
      width="280px"
    >
    <div v-html="message" />

    <template #footer>
      <next-button @click="onClick" />
    </template>
  </content-with-footer>
</template>

<script>
import ContentWithFooter from '@/components/organisms/content-with-footer';
import NextButton from '@/components/atoms/first-guidance/next-button.vue';

export default {
  components: {
    ContentWithFooter,
    NextButton,
  },
  props: {
    imageSrc: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
  },
  computed: {
    image() {
      return this.$helpers.getImage(this.imageSrc);
    },
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },
};
</script>

<style lang="scss" scoped>
// TODO: local styles here
</style>

<style lang="scss">
// global styles
@import '@/assets/scss/_variables.scss';

.content-with-footer {
  padding: 0 16px;
  color: #000;
  background-color: #f2ebd3;

  .content-with-footer__content {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    div {
      margin-top: 80px;
      font-size: $font-size-large;
      line-height: 1.5;
    }
  }
}

@media only screen and (max-width: 320px) {
  .content-with-footer {
    .content-with-footer__content {
      img {
        width: 75%;
      }

      div {
        margin-top: 40px;
      }
    }
  }
}
</style>
