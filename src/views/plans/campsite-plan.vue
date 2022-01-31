<template>
  <v-ons-page @show="show">
    <custom-toolbar title="計画一覧" />
    <div class="content">
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
          :future-plans="futurePlans"
          :past-plans="pastPlans"
        />
      </v-ons-card>
    </div>
  </v-ons-page>
</template>

<script>
import TimePlan from '@/components/organisms/plan/time-plan';
import AddPlan from '@/views/plans/add-plan';

export default {
  components: {
    TimePlan,
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  computed: {
    futurePlans() {
      return this.$store.getters['models/userCampsitePlan/inFuture']({ campsiteId: this.campsite.id });
    },
    pastPlans() {
      return this.$store.getters['models/userCampsitePlan/inPast']({ campsiteId: this.campsite.id });
    },
  },
  methods: {
    goToAddPlan() {
      this.$store.dispatch('plansNavigator/push', {
        extends: AddPlan,
        onsNavigatorProps: {
          campsite: this.campsite,
        },
      });
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
