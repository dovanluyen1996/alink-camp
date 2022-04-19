<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="情報登録・設定"
    />
    <div class="background" />
    <div class="content">
      <first-guidance-index
        image-src="guidances/info-setting.svg"
        message="天気の傾向や施設情報を踏まえたキャンプ場検索で、目的地を決め、予定日設定をする事で、詳細な天気予報をお届けします。"
        @onClick="goToLocationServices"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import FirstGuidanceIndex from '@/components/organisms/first-guidance';

// pages
import LocationServices from '@/views/first-guidance/location-services';

export default {
  name: 'FirstGuidance',
  components: {
    FirstGuidanceIndex,
  },
  methods: {
    goToLocationServices() {
      this.$store.dispatch('appNavigator/push', LocationServices);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.background {
  background: $bg-first-guidance;
}
</style>
