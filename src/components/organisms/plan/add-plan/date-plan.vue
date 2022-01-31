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
            rules="required|required-future-day"
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
              @click="handleSubmit(goToRegistration)"
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
  data() {
    return {
      startedDate: '',
      finishedDate: '',
    };
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async goToRegistration() {
      const params = {
        campsiteId: this.campsite.id,
        startedDate: this.startedDate,
        finishedDate: this.finishedDate,
      };

      await this.$store.dispatch('models/userCampsitePlan/createUserCampsitePlan', params);
    },
    async goToListPlan() {
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
