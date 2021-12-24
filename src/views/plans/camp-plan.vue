<template>
  <v-ons-page>
    <custom-toolbar title="計画一覧" />
    <div class="content">
<<<<<<< HEAD
      <add-plan />
=======
      <v-ons-col class="text">
        <v-ons-row class="text__desc">
          〇〇〇〇〇〇〇〇〇〇〇〇<br>〇〇〇〇〇〇〇〇〇〇〇〇キャンズ場
        </v-ons-row>
      </v-ons-col>

      <v-ons-card>
        <v-ons-button
          class="button--red button--more button--more__description"
          @click="goToCampDayPlan"
        >
          <img
            :src="require('@/assets/images/form/icon-add.png')"
            class="icon-add"
          >
          新規計画の追加
        </v-ons-button>

        <time-plan
          :presents="presents"
          :pasts="pasts"
        />
      </v-ons-card>
>>>>>>> 965e8c5 (screen plan day)
    </div>
  </v-ons-page>
</template>

<<<<<<< HEAD
<script setup>
import AddPlan from '@/components/organisms/plan/add-plan';
=======
<script>
import TimePlan from '@/components/organisms/plan/time-plan';
import CampDayPlan from '@/views/plans/camp-day-plan';
>>>>>>> 965e8c5 (screen plan day)

export default {
  components: {
    AddPlan,
  },
  methods: {
    goToCampDayPlan() {
      this.$store.dispatch('plansNavigator/push', CampDayPlan);
    },
  },
};
</script>
