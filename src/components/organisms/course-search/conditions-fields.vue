<template>
  <div>
    <div class="card__title">
      お天気詳細情報
    </div>
    <check-field
      v-model="sunnyValue"
      label="雨の確率が低いゴルフコース"
    />

    <div class="card__title">
      気温
    </div>
    <custom-radio
      v-model="temperatureValue"
      :labels="temperatureLabels"
    />

    <div class="card__title">
      その他
    </div>
    <check-field
      v-model="windValue"
      label="風が穏やかな予報のコース"
      :disable="isWindValueDisable"
    />
    <check-field
      v-model="uvValue"
      label="紫外線が弱い予報のコース"
      :disable="isUvValueDisable"
    />
  </div>
</template>

<script>
import CheckField from '@/components/organisms/form/check-field';
import CustomRadio from '@/components/atoms/form/custom-radio';

export default {
  name: 'CourseSearchConditionsFields',
  components: {
    CheckField,
    CustomRadio,
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
    isWindValueDisable() {
      return !this.isValidDateRange(this.dateValue);
    },
    isUvValueDisable() {
      return !this.isValidDateRange(this.dateValue);
    },
    sunnyValue: {
      get() {
        return this.searchConditions.sunny;
      },
      set(sunny) {
        this.searchConditions = { sunny };
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
    dateValue() {
      return this.searchConditions.date;
    },
  },
  watch: {
    dateValue(value) {
      if (this.isValidDateRange(value)) return;

      this.uvValue = false;
      this.windValue = false;
    },
  },
  methods: {
    isValidDateRange(date) {
      if (!date) return true;

      const selectedDate = this.$moment(date);
      const fromDate = this.$moment().startOf('day');
      const toDate = this.$moment().add(11, 'days').endOf('day');

      return selectedDate.isAfter(fromDate) && selectedDate.isBefore(toDate);
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
