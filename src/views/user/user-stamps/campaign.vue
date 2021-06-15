<template>
  <!-- TODO: 部品化してどこでも呼び出せるようにする -->
  <v-ons-page>
    <v-ons-alert-dialog
      :visible="true"
    >
      <template #title>
        ログインキャンペーン
      </template>
      <div class="sponsor">
        <img src="@/assets/images/user/stamps/campaign/sponsor-sample.png">
      </div>
      <div class="user_stamps-number">
        所持応募券：<span>{{ user.ticket_count }}</span>枚
      </div>
      <div class="campaign-stamps">
        <!-- TODO: アニメーションを付けたい -->
        <div
          v-for="number in 10"
          :key="number"
          :class="['campaign-stamps__count', {'has-stamp' : hasStamp(number)}]"
        >
          <img
            v-if="hasStamp(number)"
            src="@/assets/images/user/stamps/campaign/flag.png"
            width="40"
          >
        </div>
      </div>
      <template #footer>
        <v-ons-button
          modifier="quiet quiet-dark"
          class="close-button"
          @click="closeCampaign"
        >
          決定
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
import AppTabbar from '@/views/app-tabbar';

export default {
  name: 'UserStampsCampaign',
  data() {
    return {
      user: {
        ticket_count: 30,
        user_stamps: {
          number: 4,
        },
      },
    };
  },
  methods: {
    hasStamp(number) {
      return number <= this.user.user_stamps.number;
    },
    closeCampaign() {
      this.$store.dispatch('appNavigator/reset', AppTabbar);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .alert-dialog-title {
    color: #fff;
    background: #299025;
  }

  .alert-dialog-content {
    padding-right: 20px;
    padding-left: 20px;
  }

  .alert-dialog-footer {
    padding-bottom: 40px;
  }
}

.sponsor {
  height: 80px;
  margin-bottom: 20px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.user_stamps-number {
  margin-bottom: 25px;
  font-weight: 600;
  text-align: center;

  span {
    font-size: 24px;
  }
}

.campaign-stamps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &__count {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    margin-top: -1px;
    margin-left: -1px;
    background-color: #faf7ec;
    border: 1px solid #dedede;

    @for $number from 1 through 10 {
      &:nth-child(#{$number}) {
        background-image: url('~@/assets/images/user/stamps/campaign/#{$number}.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 40px;
      }
    }

    &.has-stamp {
      background-color: #fff2ac;
      border-color: #dedede;

      @for $number from 1 through 10 {
        &:nth-child(#{$number}) {
          background-image: url('~@/assets/images/user/stamps/campaign/#{$number}-on.png');
        }
      }
    }
  }
}

.close-button {
  width: 180px;
}
</style>
