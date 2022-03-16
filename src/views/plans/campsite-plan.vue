<template>
  <v-ons-page @show="show">
    <custom-toolbar title="計画一覧" />
    <div class="content">
      <loading :visible="isLoading" />
      <v-ons-col class="text">
        <v-ons-row class="text__desc">
          {{ campsite.name }}
        </v-ons-row>
      </v-ons-col>

      <v-ons-card>
        <v-ons-button
          class="button--red button--more button--more__description"
          @click="goToAddPlan"
        >
          <img
            :src="require('@/assets/images/form/icon-add.png')"
            class="icon-add"
          >
          新規計画の追加
        </v-ons-button>

        <time-plan
          :future-plans="displayedFuturePlans"
          :past-plans="displayedPastPlans"
        />
      </v-ons-card>

      <confirm-dialog
        :is-shown.sync="isErrorDialogVisible"
        @clickConfirm="goToPurchase"
      >
        <template #title>
          拡張機能
        </template>
        <template #message>
          プレミアムサービスにご登録いただくことで、予定を複数作成することができます。
        </template>
        <template #confirmAction>
          プレミアムへ
        </template>
      </confirm-dialog>
    </div>
  </v-ons-page>
</template>

<script>
import TimePlan from '@/components/organisms/plan/time-plan';
import AddPlan from '@/views/plans/add-plan';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';
import InformationPurchase from '@/views/purchase-information/index.vue';

import moment from 'moment';

export default {
  components: {
    TimePlan,
    ConfirmDialog,
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPurchased: false,
      isErrorDialogVisible: false,
    };
  },
  computed: {
    futurePlans() {
      const plans = this.$store.getters['models/userCampsitePlan/inFuture']({ campsiteId: this.campsite.id });

      return plans.sort(
        (a, b) => (moment(a.startedDate).isBefore(b.startedDate) ? -1 : 1),
      );
    },
    pastPlans() {
      const plans = this.$store.getters['models/userCampsitePlan/inPast']({ campsiteId: this.campsite.id });

      return plans.sort(
        (a, b) => (moment(a.startedDate).isAfter(b.startedDate) ? -1 : 1),
      );
    },
    displayedFuturePlans() {
      if (!this.futurePlans.length) return [];

      const newestPlan = this.futurePlans[this.futurePlans.length - 1];
      return this.isPurchased ? this.futurePlans : [newestPlan];
    },
    displayedPastPlans() {
      if (!this.pastPlans.length) return [];

      const newestPlan = this.pastPlans[0];
      return this.isPurchased ? this.pastPlans : [newestPlan];
    },
    isLoading() {
      return this.$store.getters['purchase/isLoading'];
    },
  },
  async created() {
    await this.setIsPurchased();
  },
  methods: {
    goToAddPlan() {
      const isShowPremium = !this.isPurchased && this.futurePlans.length;
      if (isShowPremium) {
        this.showErrorDialog();
        return;
      }

      this.$store.dispatch('plansNavigator/push', {
        extends: AddPlan,
        onsNavigatorProps: {
          campsite: this.campsite,
        },
      });
    },
    showErrorDialog() {
      this.isErrorDialogVisible = true;
    },
    closeErrorDialog() {
      this.isErrorDialogVisible = false;
    },
    async setIsPurchased() {
      this.isPurchased = await this.$store.dispatch('purchase/getIsPurchased');
    },
    goToPurchase() {
      this.$store.dispatch('plansNavigator/push', InformationPurchase);

      this.closeErrorDialog();
    },
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
