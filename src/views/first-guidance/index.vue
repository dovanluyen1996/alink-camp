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
          width="200px"
        >
        <p>
          ゴルフコース検索をして、プレイ予定日の設定やお気に入りにして頂くことで、
          詳細なお天気予報や服装指数などの当日に向けての準備にご活用いただける情報がア
          プリのTOPに表示されます。
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
