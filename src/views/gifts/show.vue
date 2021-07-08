<template>
  <v-ons-page>
    <custom-toolbar title="特典交換" />

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
      email: this.$store.state.models.currentUser.user.email,
      confirmVisible: false,
      completedVisible: false,
    };
  },
  computed: {
    gift() {
      return this.$store.getters['models/gift/findById'](this.giftId);
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
      margin-bottom: 4px;
    }
  }

  ons-input {
    width: 100%;
  }
}
</style>
