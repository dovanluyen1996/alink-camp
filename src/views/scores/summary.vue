<template>
  <v-ons-page>
    <custom-toolbar title="ゴルフ場" />
    <!-- TODO: this.courseNameでtitleにゴルフ場の名前が渡せない問題がある -->
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
              <span>{{ targetDateFormat(userCourseResult.targetDate) }}</span>
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
// components
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  name: 'Summary',
  components: {
    FixedFooter,
  },
  props: {
    courseId: {
      type: Number,
      default: null,
      required: true,
    },
    courseName: {
      type: String,
      default: null,
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
      await this.$store.dispatch('models/userCourseResult/getUserCourseResults', this.courseId);
    },
    targetDateFormat(targetDate) {
      const date = new Date(targetDate);
      const year = date.getFullYear();
      const month = (`00${(date.getMonth() + 1)}`).slice(-2);
      const day = (`00${date.getDate()}`).slice(-2);
      const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
      return `${year}/${month}/${day} (${dayOfWeekStr})`;
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
