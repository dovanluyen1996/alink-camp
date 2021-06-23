<template>
  <v-ons-page>
    <custom-toolbar title="特典交換" />
    <div class="content">
      <validation-observer
        ref="guidanceForm"
        v-slot="{ handleSubmit }"
      >
        <card-gift :gift="gift">
          <!-- TODO: show gift's description -->
          {{ gift.overview }}

          <template #footer>
            <validation-provider
              v-slot="{ errors }"
              rules="required|email"
              name="メールアドレス"
            >
              <base-field>
                <v-ons-input
                  v-model="email"
                  placeholder="連絡先メールアドレス"
                />
              </base-field>
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </template>
        </card-gift>

        <fixed-footer>
          <v-ons-button
            modifier="large--cta rounded"
            @click="handleSubmit(showConfirm)"
          >
            抽選応募する
          </v-ons-button>
        </fixed-footer>
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
// components
import CardGift from '@/components/organisms/gift/card-gift';
import BaseField from '@/components/organisms/form/base-field';
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  components: {
    CardGift,
    BaseField,
    FixedFooter,
  },
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

<style lang="scss" scoped>
/deep/ {
  .gift-item {
    &__footer {
      margin-top: 20px;
    }
  }

  .input-field-card {
    padding: 0;
    margin: 5px 0;
  }
}
</style>
