<template>
  <v-ons-page>
    <v-ons-col class="text">
      <v-ons-row class="text__desc">
        〇〇〇〇〇〇〇〇〇〇〇〇<br />〇〇〇〇〇〇〇〇〇〇〇〇キャンズ場
      </v-ons-row>
    </v-ons-col>
    <v-ons-card>
      <v-ons-button
        class="button--red button--more"
      >
        <img
          :src="require('@/assets/images/form/icon-add.png')" width="24px" height="24px"
        >
        新規計画の追加
      </v-ons-button>

      <time-plan />
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import TimePlan from '@/components/organisms/time-plan.vue'

export default {
  components: {
    TimePlan
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

/deep/ {
  .card {
    text-align: center;
  }

  .text {
    display: grid;
    justify-content: center;
    background-color: #fff;
    &__desc {
      padding: 10px;
      font-size: 18px;
    }
  }
}
</style>
