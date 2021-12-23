<template>
  <v-ons-page>
    <custom-toolbar title="計画一覧" />
    <div class="content">
      <add-plan />
    </div>
  </v-ons-page>
</template>

<script setup>
import AddPlan from '@/components/organisms/plan/add-plan';

export default {
  components: {
    AddPlan,
  },
};
</script>
