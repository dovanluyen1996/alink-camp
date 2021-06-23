<template>
  <v-ons-page>
    <custom-toolbar title="コースお天気" />
    <div
      v-show="userCourses.length"
      class="content"
    >
      <no-data v-if="userCourses.length === 0">
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
        :courses="userCourses"
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
  computed: {
    userCourses() {
      return this.$store.getters['models/userCourse/all'];
    },
  },
  async created() {
    await this.$store.dispatch('models/userCourse/getUserCourses');
  },
  methods: {
    goToCourseSearch() {
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
  },
};
</script>
