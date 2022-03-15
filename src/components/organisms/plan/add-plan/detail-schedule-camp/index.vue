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
        :tasks="tasks"
        @update-tasks="updateTasks"
      />

      <content-with-footer>
        <template #footer>
          <v-ons-button
            modifier="large--cta yellow rounded"
            @click="goToRegistration()"
          >
            登録
          </v-ons-button>

          <v-ons-button
            modifier="large--cta rounded"
            class="button--search-day"
            @click="goToDetailPlan()"
          >
            過去の計画一覧
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import DetailTable from '@/components/organisms/plan/add-plan/detail-schedule-camp/detail-table';
import ContentWithFooter from '@/components/organisms/content-with-footer';

export default {
  components: {
    DetailTable,
    ContentWithFooter,
  },
  data() {
    return {
      tasks: {},
      forecasts: {},
    };
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  watch: {
    async tasks() {
      const tasksAt = Object.keys(this.tasks);
      const params = tasksAt.map(at => ({ target_at: at, content: this.tasks[at] }));
      await this.$store.dispatch('plan/setTasks', params);
    },
  },
  methods: {
    updateTasks(tasks) {
      this.tasks = { ...tasks };
    },
    goToRegistration() {
      // TODO: Redirect to Registration
    },
    goToDetailPlan() {
      // TODO: Redirect to Detail Plan
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
