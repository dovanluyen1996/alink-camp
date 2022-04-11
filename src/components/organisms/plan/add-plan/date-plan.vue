<template>
  <v-ons-page>
    <div class="content">
      <validation-observer
        v-slot="{ handleSubmit }"
        ref="observer"
      >
        <content-with-footer ref="contentWithFooter">
          <div class="text">
            <v-ons-row class="text__desc">
              {{ campsite.name }}
            </v-ons-row>
          </div>

          <validation-provider
            v-slot="{ errors }"
            rules="required"
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
            :rules="checkoutRules"
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
              modifier="large--cta yellow rounded"
              @click="handleSubmit(showConfirmDialog)"
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
      </validation-observer>
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
      confirmDialogVisible: false,
      completedDialogVisible: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters['models/userCampsitePlan/isLoading'];
    },
    isNew() {
      return this.$store.getters['plan/isNew'];
    },
    params() {
      return this.$store.getters['plan/params'];
    },
    startedDate: {
      get() {
        return this.params.startedDate;
      },
      set(newDate) {
        this.$store.dispatch('plan/setStartedDate', newDate);
      },
    },
    finishedDate: {
      get() {
        return this.params.finishedDate;
      },
      set(newDate) {
        this.$store.dispatch('plan/setFinishedDate', newDate);
      },
    },
    checkoutRules() {
      return 'required|required-future-day-since:@チェックイン|required-future-day|required-bwtween-14days:@チェックイン';
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
      // NOTE: 新規・編集の判定度でフッターの高さが変わるためコンテンツの余白を再計算させる
      this.$refs.contentWithFooter.setContentMargin();
    },
    startedDate() {
      this.setValidate();
    },
    finishedDate() {
      this.setValidate();
    },
  },
  created() {
    const { startedDate, finishedDate } = this.$store.getters['plan/params'];

    if (startedDate === '' || finishedDate === '') {
      this.$store.commit('components/planTab/setEnabled', false);
    }
  },
  methods: {
    setValidate() {
      this.$nextTick(async() => {
        const isValid = await this.$refs.observer.validate();
        this.$store.commit('components/planTab/setEnabled', isValid);
      });
    },
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

  .content-with-footer__footer {
    .button {
      &--search-day {
        margin-top: 20px !important;
      }
    }
  }

  .custom-input-date input {
    display: flex;
    text-align: center !important;
  }
}
</style>
