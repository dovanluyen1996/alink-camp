<template>
  <v-ons-page>
    <custom-toolbar title="特典交換" />
    <loading :visible="isLoading" />
    <div class="content">
      <validation-observer
        ref="guidanceForm"
        v-slot="{ handleSubmit }"
      >
        <content-with-footer>
          <card-gift :gift="gift">
            {{ gift.description }}
            <template #footer>
              <validation-provider
                v-slot="{ errors }"
                rules="required|email"
                name="メールアドレス"
              >
                <v-ons-input
                  v-model="email"
                  placeholder="連絡先メールアドレス"
                />
                <div
                  v-if="errors.length"
                  class="input-error-msg"
                >
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </template>
          </card-gift>

          <template #footer>
            <v-ons-button
              v-show="isButtonShown"
              modifier="large--cta rounded"
              @click="handleSubmit(showConfirm)"
            >
              抽選応募する
            </v-ons-button>
          </template>
        </content-with-footer>
      </validation-observer>
    </div>

    <v-ons-alert-dialog
      :visible.sync="confirmVisible"
      cancelable
    >
      <template #title>
        応募確認
      </template>

      {{ gift.name }}の応募をします。よろしいですか？<br>
      連絡先は{{ email }}です。<br>
      当選時に連絡が必要な場合がありますので、お間違い無いかご確認ください。

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
  </v-ons-page>
</template>

<script>
// components
import CardGift from '@/components/organisms/gift/card-gift';
import ContentWithFooter from '@/components/organisms/content-with-footer';

export default {
  components: {
    CardGift,
    ContentWithFooter,
  },
  props: {
    giftId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      confirmVisible: false,
      completedVisible: false,
      isButtonShown: true,
    };
  },
  computed: {
    gift() {
      return this.$store.getters['models/gift/findById'](this.giftId);
    },
    isLoading() {
      return this.$store.getters['models/userGift/isLoading'];
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
    async submit() {
      const params = {
        giftId: this.giftId,
        email: this.email,
      };
      this.closeConfirm();
      try {
        await this.$store.dispatch('models/userGift/createUserGift', params);
        this.showCompleted();
      } catch (e) {
        console.error(e);
      }
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
  .gift-item {
    &__footer {
      margin-top: 20px;
      margin-bottom: 4px;
    }
  }

  ons-input {
    width: 100%;
  }
}
</style>
