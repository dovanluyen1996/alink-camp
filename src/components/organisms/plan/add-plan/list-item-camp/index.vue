<template>
  <v-ons-page>
    <div class="content">
      <loading :visible="isLoading" />
      <div class="text">
        <v-ons-row class="text__desc">
          〇〇〇〇〇〇〇〇〇〇〇〇<br>〇〇〇〇〇〇〇〇〇〇〇〇キャンズ場
        </v-ons-row>
      </div>

      <v-ons-button
        class="button--share"
      >
        持ち物共有
      </v-ons-button>

      <div class="title-center">
        天気予報
      </div>

      <forecast-table />
      <item-table
        v-if="labels.length > 0"
        :labels="labels"
      />

      <div
        v-else
        class="items__note"
      >
        アイテムが登録されていません。<br>
        アイテム追加より登録して下さい。
      </div>

      <content-with-footer>
        <template #footer>
          <v-ons-button
            modifier="large--cta rounded"
            @click="goToRegistration"
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
  data() {
    return {
      labels: [
        {
          name: 'オリジナルテント',
          user_id: 1,
        },
        {
          name: 'オリジナルテント',
          user_id: null,
        },
        {
          name: 'オリジナルテント',
          user_id: 2,
        },
        {
          name: 'オリジナルテント',
          user_id: 3,
        },
        {
          name: 'オリジナルテント',
          user_id: null,
        },
        {
          name: 'オリジナルテント',
          user_id: null,
        },
        {
          name: 'オリジナルテント',
          user_id: null,
        },
      ],
    };
  },
  computed: {
    isLoading() {
      // TODO: return status of Loading
      return false;
    },
  },
  methods: {
    goToRegistration() {
      // TODO: Redirect to Registration
    },
    goToListPlan() {
      // TODO: Redirect to List Plan
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
    margin-bottom: 25px;
    background-color: #fff;

    &__desc {
      padding: 15px;
      font-size: 18px;
      font-weight: 300;
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
      &--search-day {
        margin-top: 20px !important;
      }
    }
  }
}

.items__note {
  position: absolute;
  top: 65%;
  left: 50%;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: $color-white;
  text-align: center;
  transform: translate(-50%, -50%);
}

.button--share {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  width: 120px;
  height: 34px;
  font-weight: 600;
  color: 14px;
  background-color: #fcb515;
  border-radius: 15px;

  &::before {
    display: inline-block;
    width: 19px;
    height: 22px;
    margin-right: 6px;
    content: '';
    background-image: url("~@/assets/images/weathers/icon-share.png");
    background-position: center;
    background-size: 100%;
  }
}
</style>
