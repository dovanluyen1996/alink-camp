<template>
  <v-ons-page>
    <validation-observer
      ref="guidanceForm"
      v-slot="{ handleSubmit }"
    >
      <div>
        {{ gift.name }}
        応募必要枚数：{{ gift.requiredTicketNumber }}枚
        <img :src="gift.image.url">
        {{ gift.overview }}

        <validation-provider
          v-slot="{ errors }"
          rules="required|email"
        >
          <input
            v-model="email"
            placeholder="連絡先メールアドレス"
            name="メールアドレス"
          >
          <span>{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <v-ons-button
        modifier="cta"
        @click="handleSubmit(showConfirm)"
      >
        抽選応募する
      </v-ons-button>
    </validation-observer>

    <v-ons-alert-dialog
      :visible.sync="confirmVisible"
      cancelable
    >
      <template #title>
        応募確認
      </template>

      {{ gift.name }}の応募をします。よろしいですか？<br>
      連絡先は{{ email }}です。<br>
      当選時に連絡が必要な場合がありますので、お間違え無いかご確認ください。

      <template #footer>
        <v-ons-button
          modifier="quiet quiet-dark"
          @click="closeConfirm()"
        >
          キャンセル
        </v-ons-button>
        <v-ons-button
          @click="submit()"
        >
          応募する
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog
      :visible.sync="completedVisible"
    >
      <template #title>
        応募完了
      </template>

      応募が完了しました。

      <template #footer>
        <v-ons-button
          @click="closeCompleted()"
        >
          OK
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog
      :visible.sync="errorVisible"
    >
      <template #title>
        応募失敗
      </template>

      応募に失敗しました。<br>
      {{ errorMessage }}

      <template #footer>
        <v-ons-button
          @click="closeError()"
        >
          OK
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
export default {
  props: {
    giftId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // https://github.com/rights-s/alink-golf_tenki-client/issues/266
      // TODO: currentUser.user.emailをデフォルトでセットする
      // email: this.$store.state.model.currentUser.user.email,
      email: '',
      confirmVisible: false,
      completedVisible: false,
      errorVisible: false,
      error: null,
    };
  },
  computed: {
    gift() {
      return this.$store.getters['models/gift/findById'](this.giftId);
    },
    errorMessage() {
      if (!this.error || !this.error.response) return null;
      return this.error.response.data.error;
    },
  },
  methods: {
    showConfirm() {
      this.confirmVisible = true;
    },
    closeConfirm() {
      this.confirmVisible = false;
    },
    showCompleted() {
      this.completedVisible = true;
    },
    closeCompleted() {
      this.completedVisible = false;
      this.$store.dispatch('menuNavigator/pop');
    },
    showError(e) {
      this.errorVisible = true;
      this.error = e;
    },
    closeError() {
      this.errorVisible = false;
      this.error = null;
    },
    async submit() {
      const params = {
        giftId: this.giftId,
        email: this.email,
      };

      try {
        await this.$store.dispatch('models/userGift/createUserGift', params);

        this.closeConfirm();
        this.showCompleted();
      } catch (e) {
        this.closeConfirm();
        this.showError(e);
      }
    },
  },
};
</script>
