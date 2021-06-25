<template>
  <v-ons-page>
    <custom-toolbar :title="course.name" />
    <span>スコアのサマリー情報</span>
    <v-ons-card>
      <div class="content">
        <v-ons-list modifier="noborder">
          <v-ons-list-item>
            <!-- TODO: スコアチャートの表示 -->
            <!-- TODO: 過去の予定日の天気を表示 -->
          </v-ons-list-item>

          <v-ons-list-item
            v-for="userCourseResult in userCourseResults"
            :key="userCourseResult.id"
            @click="goToResultEdit(userCourseResult)"
          >
            <div class="center">
              <span>{{ displayTargetDate(userCourseResult.targetDate) }}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
    <fixed-footer>
      <v-ons-button
        modifier="large--cta add rounded"
        @click="goToResultCreate"
      >
        スコア追加
      </v-ons-button>
    </fixed-footer>
  </v-ons-page>
</template>

<script>
import DateConverter from '@/lib/date_converter';

// components
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  name: 'ScoreSummary',
  components: {
    FixedFooter,
  },
  props: {
    course: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    userCourseResults() {
      return this.$store.getters['models/userCourseResult/all'];
    },
  },
  async created() {
    await this.getUserCourseResults();
  },
  methods: {
    async getUserCourseResults() {
      await this.$store.dispatch('models/userCourseResult/getUserCourseResults', this.course.id);
    },
    displayTargetDate(targetDate) {
      return DateConverter.toLongString(targetDate);
    },
    goToResultEdit() {
      // TODO: issue#133 スコア編集画面に遷移
    },
    goToResultCreate() {
      // TODO: issue#134 スコア新規登録画面に遷移
    },
  },
};
</script>
