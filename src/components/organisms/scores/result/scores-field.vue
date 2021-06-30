<template>
  <base-field
    title="総合スコア"
    class="scores-field"
  >
    <v-ons-row>
      <v-ons-col>
        <v-ons-input
          v-model="inputedTotalScoreValue"
          type="text"
        />
      </v-ons-col>
      <v-ons-col>
        <v-ons-input
          v-model="inputedPattingScoreValue"
          type="text"
        />
      </v-ons-col>
    </v-ons-row>
  </base-field>
</template>

<script>
// components
import BaseField from '@/components/organisms/form/base-field';

export default {
  name: 'ScoreResultScoresField',
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
/deep/ {
  .card {
    text-align: center;
  }

  .custom-input-date {
    margin: 0 auto;
    width: 180px;
  }
}
</style>
