<template>
  <content-with-footer>
    <div class="first-guidance">
      <img
        :src="image"
        class="first-guidance__image"
      >
      <div class="first-guidance__message">
        {{ message }}
      </div>
    </div>

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
@import '@/assets/scss/_variables.scss';

.first-guidance {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__image {
    // NOTE: iPhone SE 1stでも画面内にコンテンツを収まらせたいのでwidthを割合指定にしている
    width: 75%;
    max-width: 280px;
    margin-bottom: 15%;
  }

  &__message {
    // NOTE: テキストの量で高さが変わると画像に位置もずれてるので高さ固定で対策
    height: 5em;
    padding: 0 23px;
    font-size: $font-size-large;
  }
}

@media only screen and (max-width: 374px) {
  .first-guidance__image {
    margin-bottom: 10%;
  }
}
</style>
