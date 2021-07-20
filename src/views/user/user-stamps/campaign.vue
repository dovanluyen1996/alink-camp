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
        :href="sponsor.url"
        target="_blank"
      >
        <img :src="sponsor.image.url">
      </a>
    </div>
    <div class="user_stamps-number">
      所持応募券：<span>{{ currentUser.ticketCount }}</span>枚
    </div>
    <div class="campaign-stamps">
      <!-- TODO: アニメーションを付けたい -->
      <div
        v-for="stampArea in stampAreaLimit"
        :key="stampArea"
        :class="['campaign-stamps__count', {'has-stamp' : hasStamp(stampArea)}]"
      >
        <img
          v-if="hasStamp(stampArea)"
          src="@/assets/images/user/stamps/campaign/flag.png"
          width="40"
        >
      </div>
    </div>
    <template #footer>
      <v-ons-button
        class="close-button"
        @click="closeCampaign"
      >
        決定
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
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
  },
  watch: {
    async lastVisitedAt(value) {
      const lastGettedAt = localStorage.getItem('userStampLastGettedAt');
      if (!lastGettedAt || this.$helpers.isAfterDate(value, lastGettedAt)) {
        this.isVisible = true;
        await this.getUserStamp();
        localStorage.setItem('userStampLastGettedAt', value);
      }
    },
  },
  methods: {
    hasStamp(stampArea) {
      return stampArea <= this.userStamp.number;
    },
    closeCampaign() {
      this.isVisible = false;
    },
    async getUserStamp() {
      await this.$store.dispatch('models/userStamp/getUserStamp');
      await this.$store.dispatch('models/currentUser/getUser');
      await this.$store.dispatch('models/sponsor/getSponsors');
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
