<template>
  <v-ons-page>
    <div>
      <validation-observer
        ref="guidanceForm"
        v-slot="{ handleSubmit }"
      >
        <div>
          お問い合わせ項目
          <validation-provider
            v-slot="{ errors }"
            rules="required"
          >
            <select
              v-model="contact.category"
              name="カテゴリー"
            >
              <option
                disabled
                value=""
              >
                選択してください
              </option>
              <option
                v-for="category in categories"
                :key="category.index"
              >
                {{ category }}
              </option>
            </select>
            <span>{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <div>
          内容
          <validation-provider
            v-slot="{ errors }"
            rules="required"
          >
            <input
              v-model="contact.message"
              name="内容"
            >
            <span>{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <div>
          留意事項
          <input name="留意事項">
        </div>

        <v-ons-button
          @click="handleSubmit(showConfirm)"
        >
          送信確認
        </v-ons-button>
      </validation-observer>

      <v-ons-alert-dialog
        :visible.sync="confirmSendContact"
        cancelable
      >
        <template #title>
          送信確認
        </template>

        お問い合わせ内容を送信します。<br>
        メールアドレスなど記載のある場合、お間違えがあると返信メールが届かない可能性があります。ご注意ください。

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
    </div>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        message: '',
        category: '',
      },
      categories: [
        '不具合報告',
        'tenki.jpへのご要望',
        '天気に関するお問い合わせ',
        'ビジネスに関するお問い合わせ',
        'その他',
      ],
      confirmSendContact: false,
    };
  },
  methods: {
    showConfirm() {
      this.confirmSendContact = true;
    },
    closeConfirm() {
      this.confirmSendContact = false;
    },
    async submit() {
      // TODO: change app version
      const appVersion = '1.0';
      const osVersion = window.device.version;
      const deviceName = window.device.model;
      const { platform } = window.device;
      const params = {
        ...this.contact,
        deviceName,
        appVersion,
        osVersion,
        platform,
      };
      this.closeConfirm();
      await this.$store.dispatch('models/contact/sendContact', params);
    },
  },
};
</script>
