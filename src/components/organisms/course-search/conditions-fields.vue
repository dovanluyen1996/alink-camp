<template>
  <div>
    <div class="card__title">
      お天気詳細情報
    </div>
    <check-field
      v-model="inputedSunnyValue"
      label="雨の確率が低いゴルフコース"
    />

    <div class="card__title">
      気温
    </div>
    <custom-radio
      v-model="inputedTemperatureValue"
      :labels="temperatureLabels"
    />

    <div class="card__title">
      その他
    </div>
    <check-field
      v-model="inputedWindValue"
      label="風が穏やかな予報のコース"
      :disable="isWindValueDisable"
    />
    <check-field
      v-model="inputedUvValue"
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
  props: {
    sunny: {
      type: Boolean,
      default: false,
    },
    temperature: {
      type: String,
      default: '',
    },
    wind: {
      type: Boolean,
      default: false,
    },
    uv: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      default: '',
    },
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
    activeIndex() {
      return this.$store.state.course.activeIndex;
    },
    inputedSunnyValue: {
      get() {
        return this.sunny;
      },
      set(newValue) {
        this.$emit('update:sunny', newValue);
      },
    },
    inputedTemperatureValue: {
      get() {
        return this.temperature;
      },
      set(newValue) {
        this.$emit('update:temperature', newValue);
      },
    },
    inputedWindValue: {
      get() {
        return this.wind;
      },
      set(newValue) {
        this.$emit('update:wind', newValue);
      },
    },
    inputedUvValue: {
      get() {
        return this.uv;
      },
      set(newValue) {
        this.$emit('update:uv', newValue);
      },
    },
    isWindValueDisable() {
      return !this.isValidDateRange(this.date);
    },
    isUvValueDisable() {
      return !this.isValidDateRange(this.date);
    },
  },
  watch: {
    date(value) {
      if (this.isValidDateRange(value)) return;

      this.inputedUvValue = false;
      this.inputedWindValue = false;
    },
  },
  methods: {
    isValidDateRange(date) {
      if (!date) return true;

      const selectedDate = this.$moment(date);
      const fromDate = this.$moment().startOf('day');
      const toDate = this.$moment().add(9, 'days').endOf('day');

      return selectedDate.isSameOrAfter(fromDate) && selectedDate.isBefore(toDate);
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
