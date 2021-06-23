<template>
  <card-with-title>
    <template #title>
      PUSH設定
    </template>
    <v-ons-list modifier="noborder">
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            天気予報
            <v-ons-switch
              v-model="settingValue.isReceivableWeatherForecast"
              data-model="isReceivableWeatherForecast"
              @change="event => setUserSetting(event)"
            />
          </span>
          <span class="list-item__subtitle">
            ※予定日当日の予報が発表された際にご連絡します（最速で10日前となります）
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            予定日の天気を毎日ご連絡
            <v-ons-switch
              v-model="settingValue.isReceivableDailyWhetherForecast"
              data-model="isReceivableDailyWhetherForecast"
              @change="event => setUserSetting(event)"
            />
          </span>
          <span class="list-item__subtitle">
            ※予定日10日前より定期的に該当コースの天気をご連絡します<br>
            ※急な変化の際のキャンセルの判断にご利用ください
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            落雷、雨雲警報
            <v-ons-switch
              v-model="settingValue.isReceivableWarning"
              data-model="isReceivableWarning"
              @change="event => setUserSetting(event)"
            />
          </span>
          <span class="list-item__subtitle">
            ※予定日当日に該当コースで落雷警報が出た場合にご連絡します
          </span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </card-with-title>
</template>

<script>
import CardWithTitle from '@/components/organisms/card-with-title';

export default {
  name: 'UserSettingList',
  components: {
    CardWithTitle,
  },
  props: {
    userSetting: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    settingValue: {
      get() {
        return { ...this.userSetting };
      },
      set(newValue) {
        this.$emit('updateUserSetting', newValue);
      },
    },
  },
  methods: {
    setUserSetting(event) {
      const targetSettingModel = event.switch.dataset.model;
      this.settingValue = { ...this.settingValue, [targetSettingModel]: event.value };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.card {
  padding-top: 3px;
  padding-bottom: 22px;
}

.center {
  padding-top: 12px;
  padding-bottom: 12px;
}

.list-item {
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: $font-size-large;
    font-weight: 600;
    line-height: 1.5;
  }

  &__subtitle {
    font-size: $font-size-small;
    color: $color-subtext;
  }
}

.switch {
  margin-left: 20px;
}
</style>
