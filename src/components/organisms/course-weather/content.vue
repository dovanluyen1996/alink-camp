<template>
  <v-ons-card class="course-weather-show">
    <course-weather-header
      :name="courses.name"
      :address="courses.address"
      :is-favorited="isFavorited"
    />
    <div
      v-if="DailyWeatherForecast"
      class="course-weather-detail"
    >
      <course-weather-plan :target_at="`2021/06/14 9:00`" />
      <course-weather-of-the-day :forecast="DailyWeatherForecast" />
      <course-weather-the-day-before :forecast="beforeDayWeatherForecast" />
      <course-weather-hourly-weather />
    </div>
    <template v-else-if="weatherForecasts">
      <course-weather-calendar
        :forecasts="weatherForecasts"
      />
    </template>
  </v-ons-card>
</template>

<script>
// components
import CourseWeatherHeader from '@/components/organisms/course-weather/header';
import CourseWeatherPlan from '@/components/organisms/course-weather/plan';
import CourseWeatherOfTheDay from '@/components/organisms/course-weather/weather-of-the-day';
import CourseWeatherTheDayBefore from '@/components/organisms/course-weather/weather-the-day-before';
import CourseWeatherHourlyWeather from '@/components/organisms/course-weather/hourly-weather';
import CourseWeatherCalendar from '@/components/organisms/course-weather/calendar';

export default {
  name: 'CourseWeatherShow',
  components: {
    CourseWeatherHeader,
    CourseWeatherPlan,
    CourseWeatherOfTheDay,
    CourseWeatherTheDayBefore,
    CourseWeatherHourlyWeather,
    CourseWeatherCalendar,
  },
  props: {
    isFavorited: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      courses: {
        id: 1,
        poi_id: 1,
        jalan_code: 'shintoukyou',
        name: '新東京都民ゴルフ場',
        name_kana: 'シントウキョウトミンゴルフジョウ',
        address: '東京都足立区新田１丁目１５−１',
        latitude: 0,
        longitude: 0,
        phone: '000-0000-0000',
        phone2: '000-0000-0000',
        url: 'http://',
        jalan_description: 'じゃらんコース紹介',
        jalan_image_path: 'jaran_image_path',
        jalan_url: 'jaran_url',
        note: '備考',
      },
      // TODO: DailyWeatherForecast, beforeDayWeatherForecast
      //       weatherForecastsのデータは適当なので
      //       天気が取得できたら適切に変更してください
      DailyWeatherForecast: {
        weather: 1,
        tempereture_high: 32,
        tempereture_low: 12,
        sunrise: '5:00',
        sunset: '19:00',
        thunder: 1,
        dress: 1,
        uv: 1,
      },
      beforeDayWeatherForecast: {
        weather: 1,
        tempereture_high: 32,
        tempereture_low: 12,
      },
      // TODO: その日の天気が出ていない時はこちら
      weatherForecasts: [
        {
          date: '6/28（月）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '6/29（火）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '6/30（水）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/1（木）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/2（金）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/3（土）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/4（日）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/5（月）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/6（火）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/7（水）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/8（木）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/9（金）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/10（土）',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/11（日）',
          weather: 1,
          high: 20,
          low: 20,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.course-weather-detail {
  display: flex;
  flex-wrap: wrap;
}

.course-weather-plan {
  width: 100%;
}

.course-weather-of-the-day {
  width: 100%;
  margin-bottom: 10px;
}

.course-weather-the-day-before {
  width: 100%;
  margin-bottom: 10px;
}

.course-weather-time-table {
  width: 100%;
}

@media screen and (min-width: 375px) {
  .course-weather-of-the-day {
    width: 61%;
  }

  .course-weather-the-day-before {
    width: 32%;
    margin-left: 7%;
  }

  .course-weather-time-table {
    width: 100%;
  }
}

@media screen and (min-width: 590px) {
  .course-weather-of-the-day {
    width: 180px;
    margin-bottom: 0;
  }

  .course-weather-the-day-before {
    width: 95px;
    margin-bottom: 0;
    margin-left: 20px;
  }

  .course-weather-time-table {
    flex: 1;
    width: auto;
    margin-left: 20px;
  }
}
</style>
