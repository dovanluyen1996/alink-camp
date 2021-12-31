<template>
  <v-ons-page>
    <div class="content">
      <loading :visible="isLoading" />
      <div class="text">
        <v-ons-row class="text__desc">
          〇〇〇〇〇〇〇〇〇〇〇〇<br>〇〇〇〇〇〇〇〇〇〇〇〇キャンズ場
        </v-ons-row>
      </div>
      <div class="title-center">
        天気予報
      </div>

      <forecast-table />
      <item-table />

      <content-with-footer>
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
    </div>
  </v-ons-page>
</template>

<script>
// components
import ItemTable from '@/components/organisms/plan/add-plan/list-item-camp/item-table';
import ForecastTable from '@/components/organisms/plan/add-plan/list-item-camp/forecast-table';
import ContentWithFooter from '@/components/organisms/content-with-footer';

export default {
  components: {
    ForecastTable,
    ItemTable,
    ContentWithFooter,
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

  .title-center {
    padding: 32px 0 0;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }

  .content-with-footer {
    height: 0;

    .content-with-footer__content {
      padding-bottom: 0 !important;
    }
  }

  .content-with-footer__footer {
    position: fixed;
    bottom: 0;
    left: 100%;

    .button {
      &--more {
        margin: 0 auto;
      }

      &--search-day {
        margin-top: 20px !important;
      }
    }
  }
}
</style>
