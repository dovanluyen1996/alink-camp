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
          <div>
            ご報告内容に個別にお答えすることをお約束するものではありません。<br>
            ご報告内容に基づいて対応、処置することをお約束するものではありません。<br>
            アプリ操作に関するご質問に関してはお手数ですが、メニュー⇒ヘルプをご覧いただいてからお問い合わせください。<br>
          </div>
        </div>

        <v-ons-button
          @click="handleSubmit(showConfirm)"
        >
          送信確認
        </v-ons-button>
      </validation-observer>

      <v-ons-alert-dialog
        :visible.sync="confirmVisible"
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

      <v-ons-alert-dialog
        :visible.sync="completeVisible"
        cancelable
      >
        お問い合わせ頂きありがとうございました。<br>
        お問い合わせフォオームにご記入いただいたメールアドレス宛に、お問い合わせ受付の確認メールを送信させていただきました。<br><br>

        通常2営業日以内に弊社サポートセンターまたは弊社各製品担当よりお問い合わせの返信をさせて頂きますが、お問い合わせ内容や、
        混雑状況等によって前後する場合もきざいますので予めご了承ください。<br>
        お問い合わせ受付確認の自動返信メールが24時間以内に届かない場合は、メールアドレスの入カミス等が考えられます。
        その場合は大変お手数ですが、下記の弊社サポートセンターまで一度お問い合わせいただきますようよろしくお願いいたします。<br><br>

        ※迷惑メールフォルダに受信されている場合もございますので一度ご確認ください。<br>

        <template #footer>
          <v-ons-button
            @click="closeComplete()"
          >
            キャンセル
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
      confirmVisible: false,
      completeVisible: false,
    };
  },
  methods: {
    showConfirm() {
      this.confirmVisible = true;
    },
    closeConfirm() {
      this.confirmVisible = false;
    },
    showComplete() {
      this.completeVisible = true;
    },
    closeComplete() {
      this.completeVisible = false;
    },
    async submit() {
      // TODO: change app version
      const appVersion = '1.0';
      const { platform, version: osVersion, model: deviceName } = window.device || {};
      const params = {
        ...this.contact,
        deviceName,
        appVersion,
        osVersion,
        platform,
      };
      this.closeConfirm();
      await this.$store.dispatch('models/contact/sendContact', params);

      this.showComplete();
    },
  },
};
</script>
