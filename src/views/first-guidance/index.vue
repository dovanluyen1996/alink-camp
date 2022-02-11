<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="情報登録・設定"
    />

    <div class="content">
      <content-with-footer class="guidance-content">
        <img
          src="@/assets/images/guidances/info-setting.png"
          width="260px"
        >
        <p class="guidance-content__text">
          キャンプ場検索をして予定日を登録することで、詳細なお天気情報が届きます。
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
