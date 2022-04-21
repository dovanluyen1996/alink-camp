<template>
  <div class="information-tab">
    <div class="information-wrapper">
      <div class="feature-wrapper">
        <div class="title">
          特徴
        </div>

        <div class="content">
          <div class="content-body">
            {{ campsite.feature }}
          </div>
        </div>
      </div>
      <basic-information />
      <facility-detail />
      <nearby-facility />
      <traffic />
    </div>
  </div>
</template>

<script>

// components
import BasicInformation from '@/components/organisms/campsites/information-tab/basic-information';
import FacilityDetail from '@/components/organisms/campsites/information-tab/facility-detail';
import NearbyFacility from '@/components/organisms/campsites/information-tab/nearby-facility';
import Traffic from '@/components/organisms/campsites/information-tab/traffic';

export default {
  name: 'CampsiteInformationTab',
  components: {
    BasicInformation,
    FacilityDetail,
    NearbyFacility,
    Traffic,
  },
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
  },
};
</script>

<style scoped lang="scss">
  .information-tab {
    .information-wrapper {
      padding-bottom: 20px;
      margin-bottom: 30px;
      background-color: #fff;
    }
  }

  .content-body {
    margin-top: 15px;
  }

  .title {
    img {
      margin-left: 5px;
    }
  }

  .feature-wrapper {
    width: 100%;
    background-color: #fff;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      font-size: 12px;
      font-weight: bold;
      line-height: 20px;
      border-top: 4px solid #c83200;
      border-bottom: 1px solid #c83200;
    }

    .content {
      padding: 0 10px 10px;
      font-size: 12px;
    }
  }
</style>
