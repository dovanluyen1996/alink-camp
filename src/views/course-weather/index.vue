<template>
  <v-ons-page>
    <custom-toolbar title="コースお天気" />
    <no-data>
      <p>
        まだお気に入りや予定日設定しているコースがありません。<br>
        コース検索より、設定してください
      </p>
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
};
</script>
