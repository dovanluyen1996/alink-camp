<template>
  <div class="information-tab">
    <div class="information-wrapper">
      <information-feature />
      <basic-information />
      <facility-detail />
      <nearby-facility />
      <traffic />
    </div>
  </div>
</template>

<script>

// components
import InformationFeature from '@/components/organisms/campsites/information-tab/feature';
import BasicInformation from '@/components/organisms/campsites/information-tab/basic-information';
import FacilityDetail from '@/components/organisms/campsites/information-tab/facility-detail';
import NearbyFacility from '@/components/organisms/campsites/information-tab/nearby-facility';
import Traffic from '@/components/organisms/campsites/information-tab/traffic';

export default {
  name: 'CampsiteInformationTab',
  components: {
    InformationFeature,
    BasicInformation,
    FacilityDetail,
    NearbyFacility,
    Traffic,
  },
};
</script>

<style scoped lang="scss">
  .information-tab {
    .information-wrapper {
      margin-bottom: 30px;
      background-color: #fff;
    }
  }
</style>
