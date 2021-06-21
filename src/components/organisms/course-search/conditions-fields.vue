<template>
  <div>
    <div class="card__title">
      お天気詳細情報
    </div>
    <check-field
      v-model="rainyValue"
      label="雨の確率が低いゴルフコース"
    />

    <div class="card__title">
      気温
    </div>
    <radio-field
      v-model="temperatureValue"
      :labels="temperatureLabels"
    />

    <div class="card__title">
      その他
    </div>
    <check-field
      v-model="windValue"
      label="風が穏やかな予報のコース"
    />
    <check-field
      v-model="uvValue"
      label="紫外線が弱い予報のコース"
    />
  </div>
</template>

<script>
import CheckField from '@/components/organisms/form/check-field';
import RadioField from '@/components/organisms/form/radio-field';

export default {
  name: 'CourseSearchConditionsFields',
  components: {
    CheckField,
    RadioField,
  },
  data() {
    return {
      temperatureLabels: [
        {
          value: 1,
          text: '近隣ゴルフ場の中でも暖かい(暑い)コース',
        },
        {
          value: 2,
          text: '近隣ゴルフ場の中でも涼しい(寒い)コース',
        },
        {
          value: 0,
          text: '選択なし',
        },
      ],
    };
  },
  computed: {
    searchConditions: {
      get() {
        return this.$store.state.courseSearchNavigator.searchConditions;
      },
      set(newValue, oldValue) {
        // NOTE: eslintのルールに従うとjsエラーがでるので除外
        /* eslint-disable-next-line prefer-object-spread */
        const newConditions = Object.assign({}, oldValue);
        Object.assign(newConditions, newValue);

        this.$store.commit('courseSearchNavigator/setSearchConditions', newConditions);
      },
    },
    rainyValue: {
      get() {
        return this.searchConditions.rainy;
      },
      set(rainy) {
        this.searchConditions = { rainy };
      },
    },
    temperatureValue: {
      get() {
        return this.searchConditions.temperature;
      },
      set(temperature) {
        this.searchConditions = { temperature };
      },
    },
    windValue: {
      get() {
        return this.searchConditions.wind;
      },
      set(wind) {
        this.searchConditions = { wind };
      },
    },
    uvValue: {
      get() {
        return this.searchConditions.uv;
      },
      set(uv) {
        this.searchConditions = { uv };
      },
    },
  },
};
</script>

<style scoped lang="scss">
.card__title {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
