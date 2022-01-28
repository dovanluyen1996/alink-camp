<template>
  <information-tab-item>
    <template #title>
      周辺施設
    </template>

    <template #content>
      <div class="content-body">
        カヌー &nbsp;&nbsp; × <br>
        釣り &nbsp;&nbsp; × <br>
        トレッキング &nbsp;&nbsp; ○ <br>
        スターウォッチング &nbsp;&nbsp; ○ <br>
        海水浴 &nbsp;&nbsp; × <br>
        水遊び &nbsp;&nbsp; ○ <br>
        温泉 &nbsp;&nbsp; × <br>
        観光牧場 &nbsp;&nbsp; × <br>
        レジャー施設 &nbsp;&nbsp; ×
      </div>
    </template>
  </information-tab-item>
</template>

<script>
// components
import InformationTabItem from '@/components/atoms/information-tab/item';

export default {
  name: 'CampsitesInformationNearbyFacility',
  components: {
    InformationTabItem,
  },
};
</script>

<style scoped lang="scss">
.content-body {
  margin-top: 15px;
}
</style>
