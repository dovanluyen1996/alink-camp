<template>
  <v-ons-page>
    <custom-toolbar title="コースお天気" />
    <div class="content">
      <no-data v-if="courses.length === 0">
        <p>
          まだスコア登録がありません。<br>
          コース検索より、追加したいコースを選択してください
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

      <course-list
        v-else
        :courses="courses"
        @click="goToCourseSearch"
      />

      <fixed-footer>
        <v-ons-button
          modifier="large--cta add rounded"
          @click="goToCourseSearch"
        >
          別コースでスコア追加
        </v-ons-button>
      </fixed-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CourseList from '@/components/organisms/course-list.vue';
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  name: 'ScoresIndex',
  components: {
    NoData,
    CourseList,
    FixedFooter,
  },
  data() {
    return {
      courses: [
        {
          id: 1,
          poi_id: 1,
          jalan_code: 'shintoukyou',
          name: '新東京都民ゴルフ場',
          name_kana: 'シントウキョウトミンゴルフジョウ',
          address: '東京都足立区新田１丁目１５−１',
          latitude: 0,
          longitude: 0,
          phone: '000-0000-0000',
          phone2: '000-0000-0000',
          url: 'http://',
          jalan_description: 'じゃらんコース紹介',
          jalan_image_path: 'jaran_image_path',
          jalan_url: 'jaran_url',
          note: '備考',
        },
        {
          id: 2,
          poi_id: 2,
          jalan_code: 'shintoukyou',
          name: '新東京都民ゴルフ場',
          name_kana: 'シントウキョウトミンゴルフジョウ',
          address: '東京都足立区新田１丁目１５−１',
          latitude: 0,
          longitude: 0,
          phone: '000-0000-0000',
          phone2: '000-0000-0000',
          url: 'http://',
          jalan_description: 'じゃらんコース紹介',
          jalan_image_path: 'jaran_image_path',
          jalan_url: 'jaran_url',
          note: '備考',
        },
      ],
    };
  },
  methods: {
    goToCourseSearch() {
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
  },
};
</script>
