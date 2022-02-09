<template>
  <information-tab-item>
    <template #title>
      施設詳細
    </template>

    <template #content>
      <content-item>
        <template #sub-title>
          場内施設
        </template>

        <template #sub-content>
          {{ campsite.facilities }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          管理体制
        </template>

        <template #sub-content>
          {{ campsite.management }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          レンタル詳細
        </template>

        <template #sub-content>
          {{ campsite.rental }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          売店販売品目
        </template>

        <template #sub-content>
          {{ campsite.shopLineup }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          オートキャンプ
        </template>

        <template #sub-content>
          {{ autoCamping }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          デイキャンプ
        </template>

        <template #sub-content>
          {{ dayCamping }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          宿泊施設
        </template>

        <template #sub-content>
          トレーラーハウス &nbsp;&nbsp; {{ campsite.facilityTrailerHouse ? '○' : '×' }} <br>
          バンガロー等 &nbsp;&nbsp; {{ campsite.facilityBungalow ? '○' : '×' }} <br>
          常設テント等 &nbsp;&nbsp; {{ campsite.facilityPermanentTent ? '○' : '×' }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          場内施設
        </template>

        <template #sub-content>
          AC電源付きサイト &nbsp;&nbsp; {{ campsite.facilityAc ? '○' : '×' }} <br>
          ランドリー &nbsp;&nbsp; {{ campsite.facilityLaundry ? '○' : '×' }} <br>
          水洗トイレ &nbsp;&nbsp; {{ campsite.facilityFlushToilet ? '○' : '×' }} <br>
          温水シャワー &nbsp;&nbsp; {{ campsite.facilityShower ? '○' : '×' }} <br>
          風呂 &nbsp;&nbsp; {{ campsite.facilityBathroom ? '○' : '×' }} <br>
          温泉 &nbsp;&nbsp; {{ campsite.facilityHotSpring ? '○' : '×' }} <br>
          バリアフリー施設 &nbsp;&nbsp; {{ campsite.facilityBarrierFree ? '○' : '×' }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          禁止事項
        </template>

        <template #sub-content>
          直火 {{ directHeat }} <br>
          ペット {{ pets }} <br>
          花火 {{ firework }}
        </template>
      </content-item>
    </template>
  </information-tab-item>
</template>

<script>
// components
import InformationTabItem from '@/components/atoms/information-tab/item';
import ContentItem from '@/components/atoms/information-tab/content-item';

export default {
  name: 'CampsitesInformationFacilityDetail',
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
    autoCamping() {
      if (this.campsite.styleAutoCamping > 1) return '';
      return this.campsite.styleAutoCamping === 1 ? '可' : '不可';
    },
    dayCamping() {
      if (this.campsite.styleDayCamping > 1) return '';
      return this.campsite.styleDayCamping === 1 ? '常時可' : '不可';
    },
    directHeat() {
      if (this.campsite.ruleDirectHeat > 1) return '';
      return this.campsite.ruleDirectHeat === 1 ? '可' : '全面禁止';
    },
    pets() {
      if (this.campsite.rulePets > 1) return '';
      return this.campsite.rulePets === 1 ? '可' : '全面禁止';
    },
    firework() {
      if (this.campsite.ruleFirework > 1) return '';
      return this.campsite.ruleFirework === 1 ? '可' : '全面禁止';
    },
  },
  components: {
    InformationTabItem,
    ContentItem,
  },
};
</script>
