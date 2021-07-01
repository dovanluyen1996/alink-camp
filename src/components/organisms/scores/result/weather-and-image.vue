<template>
  <v-ons-card>
    <v-ons-row class="course-weather-and-image">
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
      <v-ons-col class="course-image-col">
        <custom-image-upload
          v-model="selectedFile"
          :errors="errors"
          :click-delete="showDeleteDialog"
        />
      </v-ons-col>
    </v-ons-row>

    <delete-dialog
      :is-shown.sync="isShownDeleteDialog"
      @clickDelete="clickImageDelete"
    >
      この写真を削除します。<br>
      よろしいですか？
    </delete-dialog>
  </v-ons-card>
</template>

<script>
// components
import WeatherImage from '@/components/atoms/weather-image';
import TemperatureComponent from '@/components/atoms/temperature';
import CustomImageUpload from '@/components/atoms/form/custom-image-upload';
import DeleteDialog from '@/components/organisms/dialog/delete-dialog';

export default {
  name: 'ScoreResultWeatherAndImageField',
  components: {
    WeatherImage,
    TemperatureComponent,
    CustomImageUpload,
    DeleteDialog,
  },
  props: {
    value: {
      type: [String, Object],
      default: () => '',
      required: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShownDeleteDialog: false,
      // TODO: ダミーなので天気APIに合わせてください
      weather: {
        weatherId: 1,
        high: 20,
        low: 10,
      },
    };
  },
  computed: {
    selectedFile: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
    displayDate() {
      // TODO: 日付を取得してください
      return '6/28';
    },
  },
  methods: {
    showDeleteDialog() {
      this.isShownDeleteDialog = true;
    },
    clickImageDelete() {
      this.selectedFile = '';
      this.isShownDeleteDialog = false;
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

.custom-image-upload {
  margin-top: 5px;
}

/deep/ {
  .card {
    text-align: center;
  }

  .custom-input-date {
    width: 180px;
    margin: 0 auto;
  }

  .temperature__unit {
    margin-left: 0;
  }

  .upload-button {
    margin-bottom: -20px;
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

@media screen and (min-width: 375px) {
  .course-weather-col {
    margin-right: 15px;
  }

  .course-image-col {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>
