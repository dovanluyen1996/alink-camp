<template>
  <base-field
    title="総合スコア"
    class="scores-field"
  >
    <v-ons-row vertical-align="bottom">
      <v-ons-col width="55%">
        <v-ons-row
          vertical-align="bottom"
          class="total-score-field"
        >
          <v-ons-col class="total-score-label">
            合計打数
          </v-ons-col>
          <validation-provider
            v-slot="{ errors }"
            rules="required|numeric"
            name="合計打数"
          >
            <v-ons-col>
              <v-ons-input
                v-model="inputedTotalScoreValue"
                type="number"
                class="total-score-input"
              />
            </v-ons-col>
            <v-ons-col class="score-unit">
              打
            </v-ons-col>
            <span>{{ errors[0] }}</span>
          </validation-provider>
        </v-ons-row>
      </v-ons-col>
      <v-ons-col>
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
              type="number"
              class="patting-score-input"
            />
          </v-ons-col>
          <v-ons-col class="score-unit">
            打
          </v-ons-col>
        </v-ons-row>
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
      default: '',
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
  padding-left: 25%;
}

.patting-score-input {
  /deep/ input {
    font-size: $font-size-large;
    text-align: center;
  }
}

</style>
