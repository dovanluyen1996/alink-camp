<template>
  <v-ons-page>
    <div class="content">
      <loading :visible="isLoading" />
      <div class="text">
        <v-ons-row class="text__desc">
          〇〇〇〇〇〇〇〇〇〇〇〇<br>〇〇〇〇〇〇〇〇〇〇〇〇キャンズ場
        </v-ons-row>
      </div>

      <detail-past-table />

      <content-with-footer>
        <template #footer>
          <v-ons-button
            modifier="large--cta yellow rounded"
            @click="goToEdit()"
          >
            編集保存
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components

import ContentWithFooter from '@/components/organisms/content-with-footer';
import DetailPastTable from '@/components/organisms/plan/detail-past-plan/past-plan-table';

export default {
  components: {
    DetailPastTable,
    ContentWithFooter,
  },
  methods: {
    goToEdit() {
      // TODO: Show edit confirmation dialog
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

  .content-with-footer {
    height: 0;

    .content-with-footer__content {
      padding-bottom: 0 !important;
    }
  }

  .content-with-footer__footer {
    position: fixed;
    bottom: 0;
    left: inherit;

    .button {
      margin: 0 55px !important;
      font-size: 14px !important;
    }
  }
}
</style>
