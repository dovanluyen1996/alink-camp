<template>
  <div :class="['campsite-weather-plan', {'is-today' : isBetween}]">
    {{ longDate(plan.startedDate) }}〜{{ longDate(plan.finishedDate) }}
    <span class="campsite-weather-plan__count-down">
      {{ showCountDown }}
    </span>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CampsiteWeatherPlan',
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
  computed: {
    longDate() {
      return date => this.$helpers.toLongString(date);
    },
    isBetween() {
      return moment().startOf('day').isBetween(this.plan.startedDate, this.plan.finishedDate, null, '[]');
    },
    showCountDown() {
      if (this.isBetween) return '予定日';

      const startedDate = moment(this.plan.startedDate).startOf('days');
      const today = moment().startOf('days');
      const remainingDays = startedDate.diff(today, 'days');

      return `予定日まで${remainingDays}日`;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.campsite-weather-plan {
  display: flex;
  justify-content: space-around;
  height: 20px;
  padding: 5px 30px;
  font-size: $font-size-small;
  font-weight: 300;
  color: #000;
  background: #f5e9e6;

  &__count-down {
    font-weight: 600;
    color: #eb2727;
  }

  &.is-today {
    background: #fff0f0;

    .campsite-weather-plan__count-down {
      color: #eb2727;
    }
  }
}

@media only screen and (max-width: 375px) {
  .campsite-weather-plan {
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
