<template>
  <v-ons-page @show="show">
    <div class="content">
      <content-with-footer ref="contentWithFooter">
        <campsite-name :campsite-name="campsite.name" />

        <detail-table
          :forecasts="forecasts"
          :past-weather="pastWeather"
          :tasks.sync="tasks"
        />

        <template #footer>
          <v-ons-button
            modifier="large--cta yellow rounded"
            @click="showConfirmDialog"
          >
            {{ displayText.saveButton }}
          </v-ons-button>

          <v-ons-button
            v-if="isNew"
            modifier="large--cta rounded"
            class="button--search-day"
            @click="goToListPlan"
          >
            過去の計画一覧
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>

    <confirm-dialog
      :is-shown.sync="confirmDialogVisible"
      @clickConfirm="submit"
    >
      <template #title>
        {{ displayText.confirmTitle }}
      </template>

      <template #message>
        キャンプ計画を{{ displayText.confirmType }}します。よろしいですか？
      </template>

      <template #confirmAction>
        {{ displayText.confirmSubmit }}
      </template>
    </confirm-dialog>

    <completed-dialog
      :action="completedAction"
      :is-visible="completedDialogVisible"
      @close="closeCompletedDialog"
    />
  </v-ons-page>
</template>

<script>
// components
import DetailTable from '@/components/organisms/plan/add-plan/detail-schedule-camp/detail-table';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';
import CampsiteName from '@/components/organisms/campsite-name';

export default {
  components: {
    DetailTable,
    ContentWithFooter,
    ConfirmDialog,
    CompletedDialog,
    CampsiteName,
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      forecasts: {},
      pastWeather: {},
      confirmDialogVisible: false,
      completedDialogVisible: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters['models/weather/isForecastHourlyLoading'];
    },
    params() {
      return this.$store.getters['plan/params'];
    },
    tasks: {
      get() {
        const fn = (acc, cur) => {
          const targetAt = this.$moment(cur.targetAt).format('YYYY-MM-DD HH:mm');
          acc[targetAt] = cur.content;
          return acc;
        };

        return this.params.tasks.reduce(fn, {});
      },
      set(tasks) {
        const tasksAt = Object.keys(tasks);
        const params = tasksAt.map(at => ({ targetAt: at, content: tasks[at] }));
        this.$store.dispatch('plan/setTasks', params);
      },
    },
    displayText() {
      return this.isNew ? {
        saveButton: '登録',
        confirmTitle: '登録確認',
        confirmType: '登録',
        confirmSubmit: '登録',
      } : {
        saveButton: '編集保存',
        confirmTitle: '編集確認',
        confirmType: '編集',
        confirmSubmit: 'OK',
      };
    },
    completedAction() {
      return this.isNew ? 'createPlan' : 'updatePlan';
    },
  },
  watch: {
    isLoading() {
      // NOTE: 新規・編集の判定でフッターの高さが変わるためコンテンツの余白を再計算させる
      this.$refs.contentWithFooter.setContentMargin();
    },
  },
  methods: {
    async submit() {
      this.confirmDialogVisible = false;

      if (this.isNew) {
        await this.$store.dispatch('plan/createPlan');
      } else {
        await this.$store.dispatch('plan/updatePlan');
      }

      this.showCompletedDialog();
    },
    async goToListPlan() {
      await this.$store.dispatch('plansNavigator/pop');
    },
    showConfirmDialog() {
      this.confirmDialogVisible = true;
    },
    showCompletedDialog() {
      this.completedDialogVisible = true;
    },
    async closeCompletedDialog() {
      this.completedDialogVisible = false;
      await this.$store.dispatch('plansNavigator/pop');
    },
    async getForecastHourly() {
      const params = {
        campsite_id: this.campsite.id,
      };
      const forecastHourly = await this.$store.dispatch('models/weather/getForecastHourly', params);
      return forecastHourly;
    },
    async getPast() {
      const pastDates = this.$store.getters['plan/pastDates'];

      if (pastDates.length === 0) return {};

      const params = {
        campsite_id: this.campsite.id,
        target_date_from: pastDates[0],
        target_date_to: pastDates[pastDates.length - 1],
      };

      const past = await this.$store.dispatch('models/weather/getPast', params);
      return past;
    },
    async show() {
      if (this.$helpers.isEmptyObject(this.forecasts)) {
        this.forecasts = await this.getForecastHourly();
      }
      this.pastWeather = await this.getPast();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

/deep/ {
  .content-with-footer__footer {
    .button {
      font-size: $font-size-default;

      &--search-day {
        margin-top: 20px !important;
      }
    }
  }
}
</style>
