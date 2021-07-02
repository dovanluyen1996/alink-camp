<template>
  <v-ons-page>
    <custom-toolbar title="お問い合わせ" />
    <div class="content">
      <validation-observer
        ref="guidanceForm"
        v-slot="{ handleSubmit }"
      >
        <v-ons-card>
          <validation-provider
            v-slot="{ errors }"
            rules="required-select"
            name="お問い合わせ項目"
          >
            <contact-inquiry
              v-model="contact.category"
              :errors="errors"
            />
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="内容"
          >
            <contact-content
              v-model="contact.message"
              :errors="errors"
            />
          </validation-provider>
        </v-ons-card>

        <card-with-title>
          <template #title>
            留意事項
          </template>
          <div>
            ご報告内容に個別にお答えすることをお約束するものではありません。<br>
            ご報告内容に基づいて対応、処置することをお約束するものではありません。<br>
            アプリ操作に関するご質問に関してはお手数ですが、メニュー⇒ヘルプをご覧いただいてからお問い合わせください。<br>
          </div>
        </card-with-title>

        <fixed-footer>
          <v-ons-button
            modifier="large--cta rounded"
            @click="handleSubmit(showConfirmDialog)"
          >
            送信確認
          </v-ons-button>
        </fixed-footer>
      </validation-observer>
    </div>

    <v-ons-alert-dialog
      :visible.sync="confirmDialogVisible"
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
          @click="closeConfirmDialog()"
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
      :visible.sync="completeDialogVisible"
      cancelable
      modifier="notitle"
    >
      <span
        class="alert-dialog-close-btn"
        @click="closeCompleteDialog()"
      />

      お問い合わせ頂きありがとうございました。<br>
      お問い合わせフォオームにご記入いただいたメールアドレス宛に、お問い合わせ受付の確認メールを送信させていただきました。<br><br>

      通常2営業日以内に弊社サポートセンターまたは弊社各製品担当よりお問い合わせの返信をさせて頂きますが、お問い合わせ内容や、
      混雑状況等によって前後する場合もきざいますので予めご了承ください。<br>
      お問い合わせ受付確認の自動返信メールが24時間以内に届かない場合は、メールアドレスの入カミス等が考えられます。
      その場合は大変お手数ですが、下記の弊社サポートセンターまで一度お問い合わせいただきますようよろしくお願いいたします。<br><br>

      ※迷惑メールフォルダに受信されている場合もございますので一度ご確認ください。<br>

      <template #footer>
        <v-ons-button
          modifier="cta"
          @click="closeCompleteDialog()"
        >
          閉じる
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
// components
import ContactInquiry from '@/components/organisms/contacts/contact-inquiry';
import ContactContent from '@/components/organisms/contacts/contact-content';
import CardWithTitle from '@/components/organisms/card-with-title';
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  components: {
    ContactInquiry,
    ContactContent,
    CardWithTitle,
    FixedFooter,
  },
  data() {
    return {
      contact: {
        message: '',
        category: -1,
      },
      confirmDialogVisible: false,
      completeDialogVisible: false,
    };
  },
  methods: {
    showConfirmDialog() {
      this.confirmDialogVisible = true;
    },
    closeConfirmDialog() {
      this.confirmDialogVisible = false;
    },
    showCompleteDialog() {
      this.completeDialogVisible = true;
    },
    closeCompleteDialog() {
      this.completeDialogVisible = false;
    },
    async submit() {
      const appVersion = await cordova.getAppVersion.getVersionNumber();
      const { platform, version: osVersion, model: deviceName } = window.device || {};
      const params = {
        ...this.contact,
        deviceName,
        appVersion,
        osVersion,
        platform,
      };
      this.closeConfirmDialog();
      await this.$store.dispatch('models/contact/sendContact', params);

      this.showCompleteDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .alert-dialog--notitle {
    .alert-dialog-title {
      display: none;
    }

    .alert-dialog-content {
      padding: 18px 20px 8px;
    }

    .alert-dialog-footer {
      padding: 24px 0;
    }
  }

  .card-width-title {
    .card-title {
      margin-top: 20px;
    }

    .content {
      font-weight: 300;
      line-height: 1.7;
    }
  }
}
</style>
