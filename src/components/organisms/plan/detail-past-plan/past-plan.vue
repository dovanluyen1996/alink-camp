<template>
  <v-ons-page>
    <div class="content">
      <loading :visible="isLoading" />
      <div class="text">
        <v-ons-row class="text__desc">
          〇〇〇〇〇〇〇〇〇〇〇〇<br>〇〇〇〇〇〇〇〇〇〇〇〇キャンズ場
        </v-ons-row>
      </div>

      <v-ons-card class="course-weather-and-image">
        <v-ons-row class="course-weather-and-image-row">
          <campsite-plan-weather
            v-if="weather"
            :weather="weather"
          />
          <v-ons-col
            v-else
            class="no-data"
          >
            <label width="150px">No Data</label>
          </v-ons-col>
          <!-- <plan-image /> -->
          <campsite-plan-image :value="image" />
        </v-ons-row>
      </v-ons-card>

      <detail-past-table :items=items />

      <content-with-footer>
        <template #footer>
          <v-ons-button
            modifier="large--cta yellow rounded"
            @click="gotoEdit()"
          >
            編集保存
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import CampsitePlanWeather from '@/components/organisms/campsite-plans/weather';
import CampsitePlanImage from '@/components/organisms/campsite-plans/image';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import DetailPastTable from '@/components/organisms/plan/detail-past-plan/past-plan-table';

export default {
  components: {
    CampsitePlanWeather,
    CampsitePlanImage,
    DetailPastTable,
    ContentWithFooter,
  },
  data() {
    return {
      items: [
        {
          date: '12/31',
        },
        {
          date: '01/01',
        },
        {
          date: '01/02',
        },
        {
          date: '01/03',
        },
      ],
      weather:
        {
          date: '12/31',
          maxTemp: '32',
          minTemp: '18',
          weatherImageName: '01.png',
          forecastTelop: '曇のち晴',
        },
      image: {
        url: 'https://www.w3schools.com/css/img_5terre.jpg', // TODO: Please delete this mock data when implement Logic
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

/deep/ {
  .card {
    margin: 20px 8px;
  }

  .text {
    display: grid;
    justify-content: center;
    background-color: $color-white;

    &__desc {
      padding: 15px;
      font-size: 18px;
    }
  }

  .content-with-footer {
    height: 0;

    .content-with-footer__content {
      padding-bottom: 0 !important;
    }
  }

  .content-with-footer__footer {
    position: fixed;
    bottom: 0;
    left: inherit;

    .button {
      margin: 0 55px !important;
    }
  }
}

.course-weather-and-image {
  text-align: center;
}

.course-weather-and-image-row {
  flex-direction: column;
}

.course-weather-col {
  margin-right: 0;
  margin-bottom: 15px;
}

@media screen and (min-width: 320px) {
  .course-weather-and-image-row {
    flex-direction: row;
  }

  .course-weather-col {
    flex: 0 0 50%;
    max-width: 50%;
    padding-right: 0;
    margin-bottom: 0;
  }

  .course-image-col {
    flex: 0 0 50%;
    max-width: 50%;
    padding-left: 5px;

    .share-button {
      min-width: 90%;
    }
  }
}

@media screen and (min-width: 375px) {
  .course-weather-col {
    padding-right: 15px;
  }

  .course-image-col {
    padding-left: 0;

    .share-button {
      min-width: 140px;
    }
  }
}

.no-data {
  margin: auto;
  font-size: 16px;
  font-weight: bold;
}

@media screen and (min-width: 320px) {
  .course-image-col {
    .share-button {
      min-width: 95%;
    }
  }
}

@media screen and (min-width: 375px) {
  .course-image-col {
    .share-button {
      min-width: 140px;
    }
  }
}
</style>
