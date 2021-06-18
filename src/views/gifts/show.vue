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
        @click="handleSubmit(showConfirmApplyGift)"
      >
        抽選応募する
      </v-ons-button>
    </validation-observer>

    <v-ons-alert-dialog
      :visible.sync="confirmApplyGiftVisible"
      cancelable
    >
      <template #title>
        応募確認
      </template>
      {{ gift.name }}の応募をします。よろしいですか？
      連絡先は{{ email }}です。
      当選時に連絡が必要な場合がありますので、お間違え無いかご確認ください。
      <template #footer>
        <v-ons-button
          modifier="quiet quiet-dark"
          @click="closeConfirmApplyGift()"
        >
          キャンセル
        </v-ons-button>
        <v-ons-button
          @click="submitApplyGift()"
        >
          応募する
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog
      :visible.sync="completedApplyGiftVisible"
      cancelable
    >
      <template #title>
        {{ result ? '応募完了' : '応募失敗' }}
      </template>
      {{ result ? '応募が完了しました。' : 'チケット枚数が足りません' }}
      <template #footer>
        <v-ons-button
          @click="closeCompletedApplyGift()"
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
      email: '',
      confirmApplyGiftVisible: false,
      completedApplyGiftVisible: false,
      result: true,
    };
  },
  computed: {
    gift() {
      return this.$store.getters['models/gift/findById'](this.giftId);
    },
  },
  methods: {
    showConfirmApplyGift() {
      this.confirmApplyGiftVisible = true;
    },
    closeConfirmApplyGift() {
      this.confirmApplyGiftVisible = false;
    },
    closeCompletedApplyGift() {
      this.completedApplyGiftVisible = false;
      this.$store.dispatch('menuNavigator/pop');
    },
    async submitApplyGift() {
      const params = {
        giftId: this.giftId,
        email: this.email,
      };

      this.result = await this.$store.dispatch('models/userGift/createUserGift', params);
      this.confirmApplyGiftVisible = false;
      this.completedApplyGiftVisible = true;
    },
  },
};
</script>
