<template>
  <div class="campsite-weather-calendar">
    <v-ons-row>
      <v-ons-col
        v-for="(forecast, index) in forecasts"
        :key="index"
        width="25%"
        class="campsite-weather-day"
      >
        <div
          class="campsite-weather-day-date"
          :class="[saturdayCol(forecast.date), sundayCol(forecast.date)]"
        >
          {{ forecast.date ? shortDate(forecast.date) : '--/--' }}
        </div>
        <div class="campsite-weather-day-weather">
          <weather-image
            :weather="forecast"
            image-width="60px"
          />
          <div class="campsite-weather-accuracy-index">
            {{ accuracyText[forecast.accuracyIndex] }}
          </div>
        </div>
        <div class="campsite-weather-day-temperature">
          <temperature-component
            :value="forecast.maxTemp"
            font-size="12px"
            class="temperature-high"
          />&nbsp;/&nbsp;
          <temperature-component
            :value="forecast.minTemp"
            font-size="12px"
            class="temperature-low"
          />
        </div>
      </v-ons-col>
    </v-ons-row>
    <div class="campsite-weather-footer">
      <div class="campsite-weather-footer-left">
        信頼度
      </div>
      <div class="campsite-weather-footer-right">
        <span>A～E</span> の表示は、予報の信頼度です。<br>低い場合は今後の予報が変わる可能性があります。
      </div>
    </div>
  </div>
</template>

<script>
// components
import WeatherImage from '@/components/atoms/weather-image';
import TemperatureComponent from '@/components/atoms/temperature';

export default {
  name: 'CampsiteWeatherCalendar',
  components: {
    WeatherImage,
    TemperatureComponent,
  },
  props: {
    forecasts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      accuracyText: {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
        5: 'E',
      },
    };
  },
  methods: {
    shortDate(date) {
      return this.$helpers.toShortString(date);
    },
    saturdayCol(date) {
      return this.$helpers.isSaturday(date) ? 'date-row__sarturday' : '';
    },
    sundayCol(date) {
      return this.$helpers.isSunday(date) ? 'date-row__sunday' : '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

@mixin colum-style {
  display: flex;
  align-items: center;
  justify-content: center;
}

.campsite-weather-calendar {
  background-color: #fff;
}

.campsite-weather-day {
  text-align: center;
  border-bottom: 1px solid $color-border;
  border-left: 1px solid $color-border;

  &:nth-child(4n),
  &:last-child {
    border-right: 1px solid $color-border;
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    border-top: 1px solid $color-border;
  }
}

.campsite-weather-day-date {
  @include colum-style;

  height: 27px;
  font-size: $font-size-small;
  color: #100101;
  background: $color-th;
}

.campsite-weather-day-weather {
  @include colum-style;

  position: relative;
  height: 57px;
  border-top: 1px solid $color-border;
  border-bottom: 1px solid $color-border;
}

/deep/ {
  .weather {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.campsite-weather-day-temperature {
  @include colum-style;

  height: 30px;
  font-size: $font-size-small;
  white-space: nowrap;

  /deep/ {
    .temperature__unit {
      margin-left: 0;
    }

    .weather {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.temperature-high {
  color: $color-temperature-high;
}

.temperature-low {
  color: $color-temperature-low;
}

.date-row {
  &__sarturday {
    color: #113095;
    background-color: #e3f6ff;
  }

  &__sunday {
    color: #9d1d1d;
    background-color: #ffeaea;
  }
}

.campsite-weather-footer {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 27px;
  padding: 8px 10px 8px 8px;
  margin-top: -1px;
  font-size: $font-size-small;
  background-color: #f4f4ee;
  border: 1px solid $color-border;
}

.campsite-weather-footer-left {
  display: inline-block;
  padding: 6px 7px;
  font-weight: bold;
  line-height: 1;
  white-space: nowrap;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: #ccc 2px 2px 0;
}

.campsite-weather-footer-right {
  margin-left: 20px;

  & span {
    font-weight: bold;
  }
}

.campsite-weather-accuracy-index {
  position: absolute;
  right: 5px;
  bottom: 1px;
  font-size: $font-size-small;
  font-weight: bold;
}
</style>
