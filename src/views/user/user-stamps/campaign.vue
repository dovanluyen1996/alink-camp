<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
  >
    <template #title>
      ログインキャンペーン
    </template>
    <div
      v-if="sponsors.length"
      class="sponsor"
    >
      <a
        v-if="sponsor.image && sponsor.image.url"
        @click="openPage(sponsor.url)"
      >
        <img :src="sponsor.image.url">
      </a>
    </div>
    <div class="user_stamps-number">
      所持応募券：<span>{{ currentUser.ticketCount }}</span>枚
    </div>
    <div class="campaign-stamps">
      <div
        v-for="stampArea in stampAreaLimit"
        :key="stampArea"
        :class="[
          'campaign-stamps__count',
          {'campaign-stamps--increase' : hasStamp(stampArea) && increaseStampArea(stampArea)
          }]"
      >
        <div :class="[{'has-stamp' : hasStamp(stampArea)}]">
          <img
            v-if="hasStamp(stampArea)"
            src="@/assets/images/user/stamps/campaign/flag.png"
            width="50px"
          >
        </div>
      </div>
    </div>
    <template #footer>
      <v-ons-button
        class="close-button"
        @click="closeCampaign"
      >
        決定
      </v-ons-button>

      <p
        v-show="isMaximumStampMessageVisible"
        class="alert-dialog-footer__msg"
      >
        今月のスタンプは全て溜まりました。<br>
        また来月お楽しみに！
      </p>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
// setting
import settings from '@/config/settings';

export default {
  name: 'UserStampsCampaign',
  data() {
    return {
      stampAreaLimit: 10,
      isVisible: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.models.currentUser.user;
    },
    userStamp() {
      return this.$store.state.models.userStamp.userStamp;
    },
    sponsors() {
      return this.$store.state.models.sponsor.sponsors;
    },
    sponsor() {
      return this.sponsors[Math.floor(Math.random() * this.sponsors.length)];
    },
    lastVisitedAt() {
      return this.$store.state.appTabbar.lastVisitedAt;
    },
    isMaximumStampMessageVisible() {
      return this.userStamp.number === settings.views.loginCampaign.num_change_to_ticket;
    },
  },
  watch: {
    async lastVisitedAt(value) {
      if (!this.isPurchased()) return;

      const lastGettedAt = localStorage.getItem('userStampLastGettedAt');
      if (!lastGettedAt || this.$helpers.isAfterDate(value, lastGettedAt)) {
        await this.getUserStamp();
        localStorage.setItem('userStampLastGettedAt', value);
        this.isVisible = true;
      }
    },
  },
  methods: {
    hasStamp(stampArea) {
      return stampArea <= this.userStamp.number;
    },
    increaseStampArea(stampArea) {
      return stampArea > this.userStamp.number - this.userStamp.increase;
    },
    closeCampaign() {
      this.isVisible = false;
    },
    async getUserStamp() {
      await this.$store.dispatch('models/userStamp/getUserStamp');
      await this.$store.dispatch('models/currentUser/getUser');
      await this.$store.dispatch('models/sponsor/getSponsors');
    },
    openPage(url) {
      this.$helpers.openPageByUrl(url);
    },
    isPurchased() {
      return this.$store.getters['purchase/isPurchased'];
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .alert-dialog-title {
    color: #fff;
    background: #c83200;
  }

  .alert-dialog-content {
    padding-right: 20px;
    padding-left: 20px;
  }

  .alert-dialog-footer {
    padding-bottom: 40px;

    &__msg {
      padding-top: 20px;
      margin: 0;
      color: #de133c;
    }
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
    position: relative;
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

    @for $number from 1 through 10 {
      .has-stamp {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff2ac;
        background-image: url('~@/assets/images/user/stamps/campaign/#{$number}-on.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 40px;
        border-color: #dedede;
        opacity: 1;
      }
    }
  }

  &--increase {
    .has-stamp {
      z-index: 9999;
      opacity: 0;
      animation: mark-stemp 0.5s ease-in 0.2s;
      animation-fill-mode: forwards;
    }
  }
}

.close-button {
  width: 180px;
}

@keyframes mark-stemp {
  0% {
    top: -12px;
    left: -12px;
    width: 80px;
    height: 80px;
    opacity: 0;
  }

  100% {
    top: 0;
    left: 0;
    width: 53px;
    height: 53px;
    opacity: 1;
  }
}
</style>
