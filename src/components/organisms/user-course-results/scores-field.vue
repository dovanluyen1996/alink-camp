<template>
  <base-field
    title="総合スコア"
    class="scores-field"
  >
    <v-ons-row vertical-align="top">
      <v-ons-col width="55%">
        <validation-provider
          v-slot="{ errors }"
          rules="required"
          name="total-score"
          :custom-messages="{ required: '合計打数を入力してください' }"
        >
          <v-ons-row
            vertical-align="bottom"
            class="total-score-field"
          >
            <v-ons-col class="total-score-label">
              合計打数
            </v-ons-col>
            <v-ons-col>
              <v-ons-input
                v-model="inputedTotalScoreValue"
                type="text"
                inputmode="numeric"
                maxlength="3"
                oninput="value = value.replace(/[^0-9]+/i,'');"
                class="total-score-input"
                @keyup.enter="hideSoftKeyboard"
              />
            </v-ons-col>
            <v-ons-col class="score-unit">
              打
            </v-ons-col>
          </v-ons-row>
          <div
            v-if="errors.length"
            class="input-error-msg"
          >
            {{ errors[0] }}
          </div>
        </validation-provider>
      </v-ons-col>
      <v-ons-col width="45%">
        <validation-provider
          v-slot="{ errors }"
          rules="lteq-total-score:@total-score"
          name="内パター"
        >
          <v-ons-row
            vertical-align="bottom"
            class="patting-score-field"
          >
            <v-ons-col
              width="100%"
              class="patting-score-label"
            >
              内パター（任意）
            </v-ons-col>
            <v-ons-col>
              <v-ons-input
                v-model="inputedPattingScoreValue"
                type="text"
                inputmode="numeric"
                maxlength="3"
                oninput="value = value.replace(/[^0-9]+/i,'');"
                class="patting-score-input"
              />
            </v-ons-col>
            <v-ons-col class="score-unit">
              打
            </v-ons-col>
          </v-ons-row>
          <div
            v-if="errors.length"
            class="input-error-msg"
          >
            {{ errors[0] }}
          </div>
        </validation-provider>
      </v-ons-col>
    </v-ons-row>
  </base-field>
</template>

<script>
// components
import BaseField from '@/components/organisms/form/base-field';

export default {
  name: 'UserCourseResultsScoresField',
  components: {
    BaseField,
  },
  props: {
    totalScore: {
      type: [Number, String],
      required: true,
    },
    pattingScore: {
      type: [Number, String],
      default: '',
    },
  },
  computed: {
    inputedTotalScoreValue: {
      get() {
        return this.totalScore;
      },
      set(newValue) {
        this.$emit('update:totalScore', newValue);
      },
    },
    inputedPattingScoreValue: {
      get() {
        return this.pattingScore;
      },
      set(newValue) {
        this.$emit('update:pattingScore', newValue);
      },
    },
  },
  methods: {
    hideSoftKeyboard() {
      // Only hide soft keyboard with Android device
      if (this.$ons.platform.isAndroid()) window.Keyboard.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

/deep/ .card {
  font-size: $font-size-small;
  font-weight: 600;
  color: $color-subtext;
  white-space: nowrap;
}

.score-unit {
  flex: 0;
  margin-left: 7px;
  font-size: $font-size-small;
}

.total-score-label {
  flex: 0;
  align-self: flex-start;
  padding-top: 3px;
  margin-right: 13px;
}

.total-score-input {
  /deep/ input {
    height: 50px;
    font-size: 28px;
    text-align: center;
  }
}

.patting-score-field {
  padding-left: 5%;

  & + .input-error-msg {
    padding-left: 5%;
    text-align: left;
  }
}

.patting-score-input {
  /deep/ input {
    font-size: $font-size-large;
    text-align: center;
  }
}

@media screen and (min-width: 320px) {
  .patting-score-field {
    padding-left: 25%;

    & + .input-error-msg {
      padding-left: 25%;
    }
  }
}

</style>
