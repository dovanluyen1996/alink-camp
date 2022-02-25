<template>
  <div>
    <div class="card__title">
      キャンプロケーション
    </div>
    <div class="location-grid">
      <div
        v-for="(item, index) in locations"
        :key="index"
        class="location-grid--item"
      >
        <check-field
          v-model="item.checked"
          :label="item.text"
        />
      </div>
    </div>

    <div class="card__title">
      施設情報
    </div>
    <div class="facility">
      <div
        v-for="(item, index) in facilities"
        :key="index"
        class="facility-flex"
      >
        <check-field
          v-model="item.checked"
          :label="item.text"
        />
      </div>
    </div>

    <div class="card__title">
      周辺情報
    </div>
    <div class="nearby-information">
      <div
        v-for="(item, index) in nearbies"
        :key="index"
        class="nearby-flex"
      >
        <check-field
          v-model="item.checked"
          :label="item.text"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CheckField from '@/components/organisms/form/check-field';

export default {
  name: 'CampsiteSearchConditionsFacility',
  components: {
    CheckField,
  },
  data() {
    return {
      locations: [
        {
          value: 1,
          text: '河畔',
          checked: false,
        },
        {
          value: 2,
          text: '湖畔',
          checked: false,
        },
        {
          value: 3,
          text: '海岸',
          checked: false,
        },
        {
          value: 4,
          text: '臨海',
          checked: false,
        },
        {
          value: 5,
          text: '林間',
          checked: false,
        },
        {
          value: 6,
          text: '山間',
          checked: false,
        },
        {
          value: 7,
          text: '高原',
          checked: false,
        },
        {
          value: 8,
          text: '公園',
          checked: false,
        },
        {
          value: 9,
          text: 'その他',
          checked: false,
        },
      ],
      facilities: [
        {
          value: 1,
          text: 'カード利用可',
          checked: false,
        },
        {
          value: 2,
          text: '駐車場有',
          checked: false,
        },
        {
          value: 3,
          text: '駅から徒歩5分以内',
          checked: false,
        },
        {
          value: 4,
          text: 'オートキャンプ可能',
          checked: false,
        },
        {
          value: 5,
          text: 'デイキャンプ可能',
          checked: false,
        },
        {
          value: 6,
          text: 'トレーラーハウス有',
          checked: false,
        },
        {
          value: 7,
          text: 'バンガローなどの宿泊施設有',
          checked: false,
        },
        {
          value: 8,
          text: '常設テント・ティピー・パオ有',
          checked: false,
        },
        {
          value: 9,
          text: 'AC電源付きサイト有',
          checked: false,
        },
        {
          value: 10,
          text: 'ランドリー有',
          checked: false,
        },
        {
          value: 11,
          text: '水洗トイレ有',
          checked: false,
        },
        {
          value: 12,
          text: '温水シャワー有',
          checked: false,
        },
        {
          value: 13,
          text: '風呂有',
          checked: false,
        },
        {
          value: 14,
          text: '温泉有',
          checked: false,
        },
        {
          value: 15,
          text: 'バリアフリー施設有',
          checked: false,
        },
        {
          value: 16,
          text: '直火可',
          checked: false,
        },
        {
          value: 17,
          text: 'ペット連れ可',
          checked: false,
        },
        {
          value: 18,
          text: '花火可',
          checked: false,
        },
      ],
      nearbies: [
        {
          value: 1,
          text: '周辺でのカヌー可',
          checked: false,
        },
        {
          value: 2,
          text: '周辺での釣り可',
          checked: false,
        },
        {
          value: 3,
          text: '周辺でのトレッキング可',
          checked: false,
        },
        {
          value: 4,
          text: '周辺でのスターウォッチング可',
          checked: false,
        },
        {
          value: 5,
          text: '周辺でのバードウォッチング可',
          checked: false,
        },
        {
          value: 6,
          text: '周辺での海水浴可',
          checked: false,
        },
        {
          value: 7,
          text: '周辺での水遊び可',
          checked: false,
        },
        {
          value: 8,
          text: '周辺の温泉施設',
          checked: false,
        },
        {
          value: 9,
          text: '周辺の観光牧場',
          checked: false,
        },
        {
          value: 10,
          text: '周辺のレジャー施設',
          checked: false,
        },
      ],
    };
  },
  computed: {
    selectedLocations() {
      return this.locations
        .filter(location => location.checked)
        .map(location => location.text);
    },
    selectedFacilities() {
      return this.facilities
        .filter(facility => facility.checked)
        .map(facility => facility.text);
    },
    selectedNearbies() {
      return this.nearbies
        .filter(nearby => nearby.checked)
        .map(nearby => nearby.text);
    },
  },
  methods: {
    searchParams() {
      // TODO: return parameters
      return {
        style_auto_camping: true,
        style_day_camping: true,
        facility_trailer_house: true,
        facility_bungalow: true,
        facility_permanent_tent: true,
        facility_ac: true,
        facility_laundry: true,
        facility_flush_toilet: true,
        facility_shower: true,
        facility_bathroom: true,
        facility_hot_spring: true,
        facility_barrier_free: true,
        rule_direct_heat: true,
        rule_pets: true,
        rule_firework: true,
        spot_canoe: true,
        spot_fishing: true,
        spot_trekking: true,
        spot_star_watching: true,
        spot_bird_watching: true,
        spot_sea_bathing: true,
        spot_waterplay: true,
        spot_hot_spring: true,
        spot_farm: true,
        spot_leisure: true,
        near_station: true,
        credit_card: true,
        parking: true,
        parking_fee: true,
      };
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.card__title {
  padding-bottom: 15px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  border-bottom: 1px solid $color-border;
}

.location-grid,
.facility,
.nearby-information {
  font-size: 14px;
  font-weight: 300;
}

.check-field {
  font-weight: 300;
}

.location-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  &--item {
    display: flex;
    align-items: center;
  }

  .check-field {
    margin-right: 10px;
  }
}

.facility-flex,
.nearby-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

/deep/ {
  .facility,
  .nearby-information {
    .custom-input {
      position: absolute;
      right: 0;
    }

    .check-field__label-text {
      margin-left: 0;
    }
  }
}
</style>
