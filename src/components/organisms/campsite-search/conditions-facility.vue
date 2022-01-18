<template>
  <div>
    <div class="card__title">
      キャンプロケーション
    </div>
    <div class="location-grid">
      <div
        v-for="item in locations"
        :key=item.value
        class="location-grid--item"
      >
        <check-field />
        <label>{{ item.text }}</label>
      </div>
    </div>

    <div class="card__title">
      施設情報
    </div>
    <div class="facility">
      <div
        v-for="item in facilitys"
        :key=item.value
        class="facility-flex"
      >
        <label>{{ item.text }}</label>
        <check-field />
      </div>
    </div>

    <div class="card__title">
      周辺情報
    </div>
    <div class="nearby-information">
      <div
        v-for="item in nearby"
        :key=item.value
        class="nearby-flex"
      >
        <label>{{ item.text }}</label>
        <check-field />
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
        },
        {
          value: 2,
          text: '河畔',
        },
        {
          value: 3,
          text: '河畔',
        },
        {
          value: 4,
          text: '河畔',
        },
        {
          value: 5,
          text: '河畔',
        },
        {
          value: 6,
          text: '河畔',
        },
        {
          value: 7,
          text: '河畔',
        },
        {
          value: 8,
          text: '河畔',
        },
        {
          value: 9,
          text: '河畔',
        },
      ],
      facilitys: [
        {
          value: 1,
          text: 'カードの利用可',
        },
        {
          value: 2,
          text: '駐車場有',
        },
        {
          value: 3,
          text: '駅から徒歩5分以内',
        },
        {
          value: 4,
          text: 'オートキャンプ可能',
        },
        {
          value: 5,
          text: 'デイキャンプ可能',
        },
        {
          value: 6,
          text: 'バンガローなどの宿泊施設有',
        },
        {
          value: 7,
          text: '常設テント・ティピー・パオの有',
        },
        {
          value: 8,
          text: '水洗トイレの有',
        },
        {
          value: 9,
          text: '温泉有',
        },
      ],
      nearby: [
        {
          value: 1,
          text: '周辺でのカヌー可',
        },
        {
          value: 2,
          text: '周辺での釣り可',
        },
        {
          value: 3,
          text: '周辺でのトレッキング可',
        },
        {
          value: 4,
          text: '周辺でのスターウォッチング可',
        },
        {
          value: 5,
          text: '周辺でのスターウォッチング可',
        },
        {
          value: 6,
          text: '周辺での海水浴可',
        },
        {
          value: 7,
          text: '周辺での海水浴可',
        },
        {
          value: 8,
          text: '周辺のレジャー施設',
        },
        {
          value: 9,
          text: '周辺のレジャー施設',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">

.card__title {
  padding-bottom: 15px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  border-bottom: 1px solid #d9d9d9;
}

.location-grid,
.facility,
.nearby-information {
  font-size: 16px;
  font-weight: 600;
}

.location-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  &--item {
    display: flex;
    column-gap: 10px;
    align-items: center;
  }
}

.facility-flex,
.nearby-flex {
  display: flex;
  justify-content: space-between;
}
</style>
