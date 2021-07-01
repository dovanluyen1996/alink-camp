<template>
  <v-ons-col class="course-weather-col">
    <div class="course-weather-date">
      {{ displayDate }}
      お天気
    </div>
    <weather-image
      :weather-id="weather.weatherId"
      :is-shown-name="true"
      image-width="95px"
    />
    <div class="course-weather-temperature course-weather-temperature--high">
      最高
      <temperature-component
        :value="weather.high"
        font-size="16px"
      />
    </div>
    /
    <div class="course-weather-temperature course-weather-temperature--low">
      最低
      <temperature-component
        :value="weather.low"
        font-size="16px"
      />
    </div>
  </v-ons-col>
</template>

<script>
// components
import WeatherImage from '@/components/atoms/weather-image';
import TemperatureComponent from '@/components/atoms/temperature';

export default {
  name: 'ScoreResultWeatherAndImageField',
  components: {
    WeatherImage,
    TemperatureComponent,
  },
  data() {
    return {
      // TODO: ダミーなので天気APIに合わせてください
      weather: {
        weatherId: 1,
        high: 20,
        low: 10,
      },
    };
  },
  computed: {
    displayDate() {
      // TODO: 日付を取得してください
      return '6/28';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.course-weather-date {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  margin-bottom: 3px;
  font-size: $font-size-small;
  background: $color-th;
  border-radius: 12px;
}

.course-weather-col {
  text-align: center;
}

.weather {
  margin-bottom: 15px;
}

.course-weather-temperature {
  display: inline-block;
  font-size: $font-size-small;

  &--high {
    color: $color-temperature-high;
  }

  &--low {
    color: $color-temperature-low;
  }
}

/deep/ {
  .temperature__unit {
    margin-left: 0;
  }
}

@media screen and (max-width: 374px) {
  .course-weather-and-image {
    flex-direction: column;
  }

  .course-weather-col {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>
