<template>
  <v-ons-page>
    <div class="content">
      <loading :visible="isLoading" />
      <div class="text">
        <v-ons-row class="text__desc">
          〇〇〇〇〇〇〇〇〇〇〇〇<br>〇〇〇〇〇〇〇〇〇〇〇〇キャンズ場
        </v-ons-row>
      </div>

      <validation-observer>
        <content-with-footer>
          <div class="card__title card__title--center card__title--top">
            チェックイン
          </div>
          <validation-provider
            rules="required|required-future-day"
            name="プレイ予定日"
          >
            <date-field
              v-model="dateValueCheckIn"
              :errors="errors"
              class="date-field__des"
            />
          </validation-provider>

          <div class="card__title card__title--center">
            チェックアウト
          </div>
          <validation-provider
            rules="required|required-future-day"
            name="プレイ予定日"
          >
            <date-field
              v-model="dateValueCheckOut"
              :errors="errors"
            />
          </validation-provider>

          <template #footer>
            <v-ons-button
              modifier="large--cta rounded"
              @click="gotoRegistration"
            >
              登録
            </v-ons-button>

            <v-ons-button
              modifier="large--cta rounded"
              class="button--search-day"
              @click="gotoListPlan"
            >
              過去の計画一覧
            </v-ons-button>
          </template>
        </content-with-footer>
      </validation-observer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import DateField from '@/components/organisms/form/date-field';
import ContentWithFooter from '@/components/organisms/content-with-footer';

export default {
  components: {
    DateField,
    ContentWithFooter,
  },
  methods: {
    gotoRegistration() {
      // TODO: Redirect to Registration
    },
    gotoListPlan() {
      // TODO: Redirect to List Plan
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
