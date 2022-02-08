<template>
  <v-ons-page>
    <div class="content">
      <loading :visible="isLoading" />
      <div class="text">
        <v-ons-row class="text__desc">
          {{ campsite.name }}
        </v-ons-row>
      </div>

      <validation-observer
        v-slot="{ handleSubmit }"
      >
        <content-with-footer>
          <validation-provider
            v-slot="{ errors }"
            rules="required|required-future-day"
            name="チェックイン"
          >
            <date-field
              v-model="startedDate"
              title="チェックイン"
              :errors="errors"
              class="date-field__des"
            />
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            rules="required|required-future-day-since:@チェックイン"
            name="チェックアウト"
          >
            <date-field
              v-model="finishedDate"
              title="チェックアウト"
              :errors="errors"
            />
          </validation-provider>

          <template #footer>
            <v-ons-button
              modifier="large--cta rounded"
              @click="handleSubmit(showConfirmDialog)"
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
      </validation-observer>
    </div>

    <confirm-dialog
      :is-shown.sync="confirmDialogVisible"
      @clickConfirm="createPlan"
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
import DateField from '@/components/organisms/form/date-field';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

export default {
  components: {
    DateField,
    ContentWithFooter,
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
      startedDate: '',
      finishedDate: '',
      confirmDialogVisible: false,
      completedDialogVisible: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters['models/userCampsitePlan/isLoading'];
    },
  },
  methods: {
    async createPlan() {
      this.confirmDialogVisible = false;

      const params = {
        campsiteId: this.campsite.id,
        startedDate: this.startedDate,
        finishedDate: this.finishedDate,
      };

      await this.$store.dispatch('models/userCampsitePlan/createUserCampsitePlan', params);

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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

/deep/ {
  .card {
    text-align: center;

    .custom-input-date {
      width: auto;
      min-width: 180px;
    }
  }

  .card__title {
    color: #000;
  }

  .card__title--top {
    margin-top: 25px;
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

  .content-with-footer {
    height: 84%;

    &__footer {
      bottom: 0;
    }
  }

  .button {
    &--search-day {
      margin-top: 20px !important;
    }
  }

  .custom-input-date input {
    display: flex;
    text-align: center !important;
  }
}
</style>
