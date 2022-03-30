<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="情報登録・設定"
    />

    <div class="content">
      <content-with-footer class="guidance-content">
        <img
          src="@/assets/images/guidances/info-setting.svg"
          width="280px"
        >
        <p class="guidance-content__text">
          天気の傾向や施設情報を踏まえたキャンプ場検索で、目的地を決め、予定日設定をする事で、詳細な天気予報をお届けします。
        </p>

        <template #footer>
          <v-ons-button
            modifier="large"
            @click="goToLocationServices"
          >
            次へ
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import ContentWithFooter from '@/components/organisms/content-with-footer';

// pages
import LocationServices from '@/views/first-guidance/location-services';

export default {
  name: 'FirstGuidance',
  components: {
    ContentWithFooter,
  },
  methods: {
    goToLocationServices() {
      this.$store.dispatch('appNavigator/push', LocationServices);
    },
  },
};
</script>

<style lang="scss" scoped>
.guidance-content {
  &__text {
    margin-top: 80px !important;
  }
}
</style>
