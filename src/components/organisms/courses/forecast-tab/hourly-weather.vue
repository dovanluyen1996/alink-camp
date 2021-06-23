<template>
  <div class="hourly-weather">
    <div class="card__title card__title--center">
      1時間ごとの天気
    </div>

    <slot name="switcher" />

    <sticky-table class="hourly-weather-table">
      <tr class="date-row">
        <th
          scope="row"
          class="th"
        >
          日
        </th>
        <!-- NOTE: stick表示にしたいのであえてcolspanはつけない -->
        <td class="date-col">
          <div class="date-col__display-date">
            {{ displayDate }}
            <span
              v-if="isToday"
              class="is-today"
            >
              ゴルフ予定日
            </span>
          </div>
        </td>
      </tr>
      <time-row :forecast-data="margedForecastsAndSuns" />
      <weather-row :forecast-data="margedForecastsAndSuns" />
      <precipitation-row :forecast-data="forecasts" />
      <temperature-row :forecast-data="forecasts" />
      <wind-direction-row :forecast-data="forecasts" />
      <wind-speed-row :forecast-data="forecasts" />
    </sticky-table>
  </div>
</template>

<script>
// components
import StickyTable from '@/components/organisms/sticky-table';
import TimeRow from '@/components/organisms/forecast-table/time-row';
import WeatherRow from '@/components/organisms/forecast-table/weather-row';
import PrecipitationRow from '@/components/organisms/forecast-table/precipitation-row';
import TemperatureRow from '@/components/organisms/forecast-table/temperature-row';
import WindDirectionRow from '@/components/organisms/forecast-table/wind-direction-row';
import WindSpeedRow from '@/components/organisms/forecast-table/wind-speed-row';

export default {
  name: 'CoursesForecastTabHourlyWeather',
  components: {
    StickyTable,
    TimeRow,
    WeatherRow,
    PrecipitationRow,
    TemperatureRow,
    WindDirectionRow,
    WindSpeedRow,
  },
  data() {
    return {
      // TODO: デミーデータです
      //       データと合わないようだったらconvertMinutesも修正してください
      date: '2021-6-22',
      sunrise: '6:30',
      sunset: '19:30',
      forecasts: [
        {
          time: '1:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '2:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '3:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '4:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '5:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '6:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '7:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '8:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '9:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '10:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '11:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '12:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '13:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '14:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '15:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '16:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '17:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '18:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '19:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '20:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '21:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '22:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '23:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          time: '24:00',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
      ],
    };
  },
  computed: {
    displayDate() {
      // TODO: this.dateを元に成形してください
      return '7日（木）';
    },
    isToday() {
      // TODO: 当日チェックしてください
      return true;
    },
    margedForecastsAndSuns() {
      const suns = [
        {
          isSunrise: true,
          time: this.sunrise,
        },
        {
          isSunset: true,
          time: this.sunset,
        },
      ];
      const margeData = this.forecasts.concat(suns);

      return margeData.sort((a, b) => this.convertMinutes(a.time) - this.convertMinutes(b.time));
    },
  },
  mounted() {
    // TODO: 予定が入っているときに実行するようにしてください
    this.tableScrollNow();
  },
  methods: {
    tableScrollNow() {
      // NOTE: セルのdate-time属性に時刻を入れてスクロール位置を取得している
      const table = this.$el.querySelector('.hourly-weather-table');
      const timeRow = table.querySelector('.time-row');
      const th = timeRow.querySelector('th');
      // TODO: targetAtのフォーマットをAPIのデータに合わせてください
      const targetAt = '6:00';
      const nowCol = timeRow.querySelector(`[date-time="${targetAt}"]`);
      const x = nowCol.offsetLeft - th.offsetWidth;

      table.scrollTo(x, 0);
    },
    convertMinutes(time) {
      // NOTE: 日の出日の入りを天気予報にマージするため
      //       時間を比較できるように分にする
      const newTime = time.split(':');
      return (Number(newTime[0]) * 60) + Number(newTime[1]);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

/deep/ {
  .table {
    text-align: center;
  }

  .th {
    white-space: nowrap;
  }
}

.date-row {
  text-align: left;
}

.date-col {
  position: sticky;
  left: 63px;

  &__display-date {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
}

.is-today {
  color: $color-is-today;
}
</style>