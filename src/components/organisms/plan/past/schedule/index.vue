<template>
  <v-ons-page>
    <div class="content">
      <content-with-footer ref="contentWithFooter">
        <div class="text">
          <v-ons-row class="text__desc">
            {{ campsite.name }}
          </v-ons-row>
        </div>

        <schedule-table
          :forecasts="forecasts"
          :tasks.sync="tasks"
          :memories.sync="memories"
        />

        <template #footer>
          <v-ons-button
            modifier="large--cta yellow rounded"
            @click="showConfirmDialog"
          >
            編集保存
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>

    <confirm-dialog
      :is-shown.sync="confirmDialogVisible"
      @clickConfirm="submit"
    >
      <template #title>
        編集確認
      </template>

      <template #message>
        このキャンプ計画または思い出を編集します。よろしいですか？
      </template>

      <template #confirmAction>
        OK
      </template>
    </confirm-dialog>

    <completed-dialog
      action="updatePlan"
      :is-visible="completedDialogVisible"
      @close="closeCompletedDialog"
    />
  </v-ons-page>
</template>

<script>
// components
import ContentWithFooter from '@/components/organisms/content-with-footer';
import ScheduleTable from '@/components/organisms/plan/past/schedule/table';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

export default {
  components: {
    ContentWithFooter,
    ScheduleTable,
    ConfirmDialog,
    CompletedDialog,
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      forecasts: {},
      confirmDialogVisible: false,
      completedDialogVisible: false,
    };
  },
  computed: {
    params() {
      return this.$store.getters['plan/params'];
    },
    startedDate() {
      return this.params.startedDate;
    },
    finishedDate() {
      return this.params.finishedDate;
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
    memories: {
      get() {
        const fn = (acc, cur) => {
          acc[cur.targetDate] = cur.image;
          return acc;
        };

        return this.params.memories.reduce(fn, {});
      },
      set(memories) {
        const memoriesDate = Object.keys(memories);
        const params = memoriesDate.map(date => ({
          targetDate: date,
          image: memories[date],
          removeImage: !memories[date],
        }));
        this.$store.dispatch('plan/setMemories', params);
      },
    },
  },
  watch: {
    startedDate() {
      this.getPast();
    },
    finishedDate() {
      this.getPast();
    },
  },
  methods: {
    async submit() {
      this.confirmDialogVisible = false;

      await this.$store.dispatch('plan/updatePlan');

      this.showCompletedDialog();
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
    async getPast() {
      if (!this.startedDate || !this.finishedDate) return;

      const params = {
        campsite_id: this.campsite.id,
        target_date_from: this.startedDate,
        target_date_to: this.finishedDate,
      };

      this.forecasts = await this.$store.dispatch('models/weather/getPast', params);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

/deep/ {
  .card {
    margin: 20px 0;
  }

  .text {
    display: grid;
    justify-content: center;
    background-color: $color-white;

    &__desc {
      padding: 15px;
      font-size: 18px;
    }
  }

  .content-with-footer__footer {
    .button {
      font-size: $font-size-default;
    }
  }
}
</style>
