<template>
  <v-ons-card class="course-weather-show">
    <course-weather-header
      :user-course="userCourse"
    />
    <div
      v-if="DailyWeatherForecast"
      class="course-weather-detail"
    >
      <!-- TODO: データの渡し方はStoreに合わせて変更してください -->
      <course-weather-plan
        v-if="userCoursePlan"
        :user-course-plan="userCoursePlan"
      />
      <course-weather-of-the-day :forecast="ForecastScheduledDate" />
      <course-weather-the-day-before :forecast="ForecastScheduledDate.day_before" />
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
  name: 'CourseWeatherContent',
  components: {
    CourseWeatherHeader,
    CourseWeatherPlan,
    CourseWeatherOfTheDay,
    CourseWeatherTheDayBefore,
    CourseWeatherHourlyWeather,
    CourseWeatherCalendar,
  },
  props: {
    userCourse: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      // TODO: DailyWeatherForecast, beforeDayWeatherForecast
      //       weatherForecastsのデータは適当なので
      //       天気が取得できたら適切に変更してください
      ForecastScheduledDate: {
        course_id: 2,
        scheduled_date: {
          date: '2021-06-29',
          forecast_telop: '晴れのち曇り',
          weather_image_name: '1.png',
          wind_speed_0: '1',
          wind_direction_0: '北北西',
          precip_0: '10',
          wind_speed_6: '2',
          wind_direction_6: '北',
          precip_6: '20',
          wind_speed_12: '3',
          wind_direction_12: '北西',
          precip_12: '30',
          wind_speed_18: '4',
          wind_direction_18: '北',
          precip_18: '40',
          max_temp: '4.7',
          min_temp: '-2.1',
          thunder_index: 0,
          dress_index: 1,
          dress_index_weather: 'fine',
          uv_index: 3,
        },
        sunrise: '6:58',
        sunset: '16:50',
        day_before: {
          date: '2021-06-28',
          forecast_telop: '晴れのち曇り',
          weather_image_name: '1.png',
          max_temp: '4.7',
          min_temp: '-2.1',
        },
      },
      Forecast10Days: {
        course_id: 2,
        items: [
          {
            date: '2021-06-29', forecast_telop: '晴れのち曇り', weather_image_name: '1.png', wind_speed: '3.2', wind_direction: '北北西', wind_image_name: '3.png', precip: '30', humidity: '10', max_temp: '4.7', min_temp: '-2.1',
          },
          {
            date: '2021-06-30', forecast_telop: '晴れのち曇り', weather_image_name: '1.png', wind_speed: '3.2', wind_direction: '北北西', wind_image_name: '3.png', precip: '30', humidity: '10', max_temp: '4.7', min_temp: '-2.1',
          },
          {
            date: '2021-07-01', forecast_telop: '晴れのち曇り', weather_image_name: '1.png', wind_speed: '3.2', wind_direction: '北北西', wind_image_name: '3.png', precip: '30', humidity: '10', max_temp: '4.7', min_temp: '-2.1',
          },
          {
            date: '2021-07-02', forecast_telop: '晴れのち曇り', weather_image_name: '1.png', wind_speed: '3.2', wind_direction: '北北西', wind_image_name: '3.png', precip: '30', humidity: '10', max_temp: '4.7', min_temp: '-2.1',
          },
          {
            date: '2021-07-03', forecast_telop: '晴れのち曇り', weather_image_name: '1.png', wind_speed: '3.2', wind_direction: '北北西', wind_image_name: '3.png', precip: '30', humidity: '10', max_temp: '4.7', min_temp: '-2.1',
          },
          {
            date: '2021-07-04', forecast_telop: '晴れのち曇り', weather_image_name: '1.png', wind_speed: '3.2', wind_direction: '北北西', wind_image_name: '3.png', precip: '30', humidity: '10', max_temp: '4.7', min_temp: '-2.1',
          },
          {
            date: '2021-07-05', forecast_telop: '晴れのち曇り', weather_image_name: '1.png', wind_speed: '3.2', wind_direction: '北北西', wind_image_name: '3.png', precip: '30', humidity: '10', max_temp: '4.7', min_temp: '-2.1',
          },
          {
            date: '2021-07-06', forecast_telop: '晴れのち曇り', weather_image_name: '1.png', wind_speed: '3.2', wind_direction: '北北西', wind_image_name: '3.png', precip: '30', humidity: '10', max_temp: '4.7', min_temp: '-2.1',
          },
          {
            date: '2021-07-07', forecast_telop: '晴れのち曇り', weather_image_name: '1.png', wind_speed: '3.2', wind_direction: '北北西', wind_image_name: '3.png', precip: '30', humidity: '10', max_temp: '4.7', min_temp: '-2.1',
          },
          {
            date: '2021-07-08', forecast_telop: '晴れのち曇り', weather_image_name: '1.png', wind_speed: '3.2', wind_direction: '北北西', wind_image_name: '3.png', precip: '30', humidity: '10', max_temp: '4.7', min_temp: '-2.1',
          },
        ],
      },
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
          date: '6/28 (月)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '6/29 (火)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '6/30 (水)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/1 (木)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/2 (金)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/3 (土)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/4 (日)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/5 (月)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/6 (火)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/7 (水)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/8 (木)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/9 (金)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/10 (土)',
          weather: 1,
          high: 20,
          low: 20,
        },
        {
          date: '7/11 (日)',
          weather: 1,
          high: 20,
          low: 20,
        },
      ],
    };
  },
  computed: {
    userCoursePlan() {
      const plans = this.userCourse.userCoursePlans;

      return (!plans || plans.length === 0) ? null : plans[0];
    },
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
