<template>
  <v-ons-page>
    <custom-toolbar title="コースお天気" />
    <no-data>
      <p>
        まだお気に入りや予定日設定しているコースがありません。<br>
        コース検索より、設定してください
      </p>
      <template #actions>
        <v-ons-button
          modifier="cta"
          @click="goToCourseSearch"
        >
          早速コース検索
        </v-ons-button>
      </template>
    </no-data>
  </v-ons-page>
</template>

<script>
import NoData from '@/components/organisms/no-data';

export default {
  name: 'CourseWeather',
  components: {
    NoData,
  },
  methods: {
    goToCourseSearch() {
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
  },
};
</script>
