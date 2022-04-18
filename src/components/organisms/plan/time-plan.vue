<template>
  <div class="time-plan">
    <template v-if="futurePlans.length">
      <span class="time-plan__title">
        終了前の計画
      </span>
      <v-ons-list modifier="noborder">
        <v-ons-list-item
          v-for="plan in futurePlans"
          :key="plan.id"
          modifier="chevron"
          @click="goToEditPlan(plan)"
        >
          <div class="center">
            <span class="list-item__title">{{ $helpers.toLongString(plan.startedDate) }}</span>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </template>

    <template v-if="pastPlans.length">
      <span class="time-plan__title">
        過去の計画
      </span>
      <v-ons-list modifier="noborder">
        <v-ons-list-item
          v-for="plan in pastPlans"
          :key="plan.id"
          modifier="chevron"
          @click="goToPastPlan(plan)"
        >
          <div class="center">
            <span class="list-item__title">{{ $helpers.toLongString(plan.startedDate) }}</span>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </template>
  </div>
</template>

<script>
// View
import PastPlanPage from '@/views/plans/past';
import EditPlanPage from '@/views/plans/edit';

export default {
  name: 'TimePlan',
  props: {
    futurePlans: {
      type: Array,
      default: () => [],
    },
    pastPlans: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToEditPlan(plan) {
      this.$store.dispatch('plansNavigator/push', {
        extends: EditPlanPage,
        onsNavigatorProps: {
          plan,
          isNew: false,
        },
      });
    },
    goToPastPlan(plan) {
      this.$store.dispatch('plansNavigator/push', {
        extends: PastPlanPage,
        onsNavigatorProps: {
          plan,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

/deep/ {
  .card {
    padding-top: 5px;
    padding-bottom: 0;
    text-align: center;
  }

  .list {
    margin-top: 8px;
    margin-bottom: 32px;
  }
}

.time-plan {
  margin-top: 30px;

  &__title {
    display: block;
    font-size: 18px;
    font-weight: 600;
    text-align: start;
  }
}

.center {
  padding-top: 20px;
  padding-bottom: 20px;
}

.list-item {
  padding-left: 0;
  margin: 0;
  border-bottom: 1px solid #d9d9d9;

  &__title {
    margin-bottom: 5px;
    font-size: 18px;
  }

  &__center {
    background-image: none;
  }
}

.list-item:first-child {
  border-top: 1px solid #d9d9d9;
}
</style>
