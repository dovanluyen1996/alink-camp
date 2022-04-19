<template>
  <v-ons-page>
    <custom-toolbar title="お問い合わせ" />
    <loading :visible="isLoading" />
    <div class="content">
      <validation-observer
        ref="guidanceForm"
        v-slot="{ handleSubmit }"
      >
        <content-with-footer>
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

          <template #footer>
            <v-ons-button
              v-show="isButtonShown"
              modifier="large--cta rounded"
              @click="handleSubmit(showConfirmDialog)"
            >
              送信確認
            </v-ons-button>
          </template>
        </content-with-footer>
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
      メールアドレスなど記載のある場合、お間違いがあると返信メールが届かない可能性があります。ご注意ください。

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
          送信する
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>

    <completed-dialog
      action="sendContact"
      :is-visible="completedDialogVisible"
      @close="closeCompletedDialog"
    />
  </v-ons-page>
</template>

<script>
// components
import ContactInquiry from '@/components/organisms/contacts/contact-inquiry';
import ContactContent from '@/components/organisms/contacts/contact-content';
import CardWithTitle from '@/components/organisms/card-with-title';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

export default {
  components: {
    ContactInquiry,
    ContactContent,
    CardWithTitle,
    ContentWithFooter,
    CompletedDialog,
  },
  data() {
    return {
      contact: {
        message: '',
        category: -1,
      },
      confirmDialogVisible: false,
      completedDialogVisible: false,
      isButtonShown: true,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters['models/contact/isLoading'];
    },
  },
  mounted() {
    window.addEventListener('keyboardDidShow', this.onKeyBoardShow);
    window.addEventListener('keyboardWillHide', this.onKeyBoardHide);
  },
  beforeDestroy() {
    window.removeEventListener('keyboardDidShow', this.onKeyBoardShow);
    window.removeEventListener('keyboardWillHide', this.onKeyBoardHide);
  },
  methods: {
    showConfirmDialog() {
      this.confirmDialogVisible = true;
    },
    closeConfirmDialog() {
      this.confirmDialogVisible = false;
    },
    showCompletedDialog() {
      this.completedDialogVisible = true;
    },
    closeCompletedDialog() {
      this.completedDialogVisible = false;

      this.$store.dispatch('menuNavigator/pop');
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

      this.showCompletedDialog();
    },
    onKeyBoardShow() {
      this.isButtonShown = false;

      // Scroll to selected input
      const activeField = document.activeElement;
      if (activeField) {
        activeField.scrollIntoView(true);
      }
    },
    onKeyBoardHide() {
      this.isButtonShown = true;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .card-width-title {
    .card-title {
      margin-top: 20px;
    }

    .content {
      line-height: 1.7;
    }
  }

  .button--rounded {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
  }
}
</style>
