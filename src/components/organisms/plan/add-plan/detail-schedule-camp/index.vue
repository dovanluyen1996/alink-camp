<template>
  <v-ons-page>
    <div class="content">
      <div class="text">
        <v-ons-row class="text__desc">
          〇〇〇〇〇〇〇〇〇〇〇〇<br>〇〇〇〇〇〇〇〇〇〇〇〇キャンプ場
        </v-ons-row>
      </div>
      <detail-table :items="items" />

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
      items: [
        {
          date: '12/31',
        },
        {
          date: '01/01',
        },
        {
          date: '01/02',
        },
        {
          date: '01/03',
        },
      ],
    };
  },
  methods: {
    goToRegistration() {
      // TODO: Redirect to Registration
    },
    goToDetailPlan() {
      // TODO: Redirect to Detail Plan
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
    bottom: 20px;
    left: inherit;

    .button {
      margin: 0 55px !important;
      font-size: 14px !important;

      &--search-day {
        margin-top: 20px !important;
      }
    }
  }
}
</style>