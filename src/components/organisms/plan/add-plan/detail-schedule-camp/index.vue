<template>
  <v-ons-page @show="show">
    <div class="content">
      <div class="text">
        <v-ons-row class="text__desc">
          {{ campsite.name }}
        </v-ons-row>
      </div>

      <detail-table
        :forecasts="forecasts"
        :tasks.sync="tasks"
      />

      <content-with-footer>
        <template #footer>
          <v-ons-button
            modifier="large--cta yellow rounded"
            @click="showConfirmDialog"
          >
            登録
          </v-ons-button>

          <v-ons-button
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
        登録確認
      </template>

      <template #message>
        キャンプ計画を登録します。よろしいですか？
      </template>

      <template #confirmAction>
        登録
      </template>
    </confirm-dialog>

    <completed-dialog
      action="createPlan"
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

export default {
  components: {
    DetailTable,
    ContentWithFooter,
    ConfirmDialog,
    CompletedDialog,
  },
  data() {
    return {
      forecasts: {},
      confirmDialogVisible: false,
      completedDialogVisible: false,
    };
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isNew() {
      return this.$store.getters['plan/isNew'];
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
  },
  methods: {
    async submit() {
      this.confirmDialogVisible = false;

      if (this.isNew) {
        this.$store.dispatch('plan/createPlan');
      } else {
        this.$store.dispatch('plan/updatePlan');
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
    async show() {
      if (this.$helpers.isEmptyObject(this.forecasts)) {
        this.forecasts = await this.getForecastHourly();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

/deep/ {
  .text {
    display: grid;
    justify-content: center;
    background-color: #fff;

    &__desc {
      padding: 15px;
      font-size: 18px;
    }
  }

  .content-with-footer {
    height: 0;

    .content-with-footer__content {
      padding-bottom: 0 !important;
    }
  }

  .content-with-footer__footer {
    position: fixed;
    bottom: 0 !important;
    left: inherit;

    .button {
      font-size: 14px !important;

      &--search-day {
        margin-top: 20px !important;
      }
    }
  }
}
</style>
