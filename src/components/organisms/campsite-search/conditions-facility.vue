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
          name: 'credit_card',
          text: 'カード利用可',
          checked: false,
        },
        {
          value: 2,
          name: 'parking',
          text: '駐車場有',
          checked: false,
        },
        {
          value: 3,
          name: 'near_station',
          text: '駅から徒歩5分以内',
          checked: false,
        },
        {
          value: 4,
          text: 'オートキャンプ可能',
          name: 'style_auto_camping',
          checked: false,
        },
        {
          value: 5,
          text: 'デイキャンプ可能',
          name: 'style_day_camping',
          checked: false,
        },
        {
          value: 6,
          text: 'トレーラーハウス有',
          name: 'facility_trailer_house',
          checked: false,
        },
        {
          value: 7,
          text: 'バンガローなどの宿泊施設有',
          name: 'facility_bungalow',
          checked: false,
        },
        {
          value: 8,
          name: 'facility_permanent_tent',
          text: '常設テント・ティピー・パオ有',
          checked: false,
        },
        {
          value: 9,
          name: 'facility_ac',
          text: 'AC電源付きサイト有',
          checked: false,
        },
        {
          value: 10,
          name: 'facility_laundry',
          text: 'ランドリー有',
          checked: false,
        },
        {
          value: 11,
          name: 'facility_flush_toilet',
          text: '水洗トイレ有',
          checked: false,
        },
        {
          value: 12,
          name: 'facility_shower',
          text: '温水シャワー有',
          checked: false,
        },
        {
          value: 13,
          name: 'facility_bathroom',
          text: '風呂有',
          checked: false,
        },
        {
          value: 14,
          name: 'facility_hot_spring',
          text: '温泉有',
          checked: false,
        },
        {
          value: 15,
          name: 'facility_barrier_free',
          text: 'バリアフリー施設有',
          checked: false,
        },
        {
          value: 16,
          name: 'rule_direct_heat',
          text: '直火可',
          checked: false,
        },
        {
          value: 17,
          name: 'rule_pets',
          text: 'ペット連れ可',
          checked: false,
        },
        {
          value: 18,
          name: 'rule_firework',
          text: '花火可',
          checked: false,
        },
      ],
      nearbies: [
        {
          value: 1,
          name: 'spot_canoe',
          text: '周辺でのカヌー可',
          checked: false,
        },
        {
          value: 2,
          name: 'spot_fishing',
          text: '周辺での釣り可',
          checked: false,
        },
        {
          value: 3,
          name: 'spot_trekking',
          text: '周辺でのトレッキング可',
          checked: false,
        },
        {
          value: 4,
          name: 'spot_star_watching',
          text: '周辺でのスターウォッチング可',
          checked: false,
        },
        {
          value: 5,
          name: 'spot_bird_watching',
          text: '周辺でのバードウォッチング可',
          checked: false,
        },
        {
          value: 6,
          name: 'spot_sea_bathing',
          text: '周辺での海水浴可',
          checked: false,
        },
        {
          value: 7,
          name: 'spot_waterplay',
          text: '周辺での水遊び可',
          checked: false,
        },
        {
          value: 8,
          name: 'spot_hot_spring',
          text: '周辺の温泉施設',
          checked: false,
        },
        {
          value: 9,
          name: 'spot_farm',
          text: '周辺の観光牧場',
          checked: false,
        },
        {
          value: 10,
          name: 'spot_leisure',
          text: '周辺のレジャー施設',
          checked: false,
        },
      ],
    };
  },
  computed: {
    selectedLocations() {
      return this.locations
        .filter(location => location.checked);
    },
    selectedFacilities() {
      return this.facilities
        .filter(facility => facility.checked);
    },
    selectedNearbies() {
      return this.nearbies
        .filter(nearby => nearby.checked);
    },
  },
  methods: {
    searchParams() {
      const params = {};

      // ロケーション
      // チェックがあればパラメーターに含める
      const location = this.selectedLocations;
      if (location.length) {
        params.location = location.map(l => l.text);
      }

      // 施設情報
      // チェックがあればパラメーターに含める
      this.selectedFacilities.forEach(f => { params[f.name] = 1 });

      // 周辺情報
      // チェックがあればパラメーターに含める
      this.selectedNearbies.forEach(n => { params[n.name] = 1 });

      return params;
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
