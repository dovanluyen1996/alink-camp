<template>
  <div class="input-field">
    <div class="input-field-title">
      お問い合わせ項目
    </div>
    <div class="input-field-body">
      <custom-select
        v-model="selectedValue"
        :options="options.map(option => ({ value: option, text: option }))"
        placeholder="選択してください"
      />
      <div
        v-if="errors.length"
        class="input-error-msg"
      >
        {{ errors[0] }}
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from '@/components/atoms/form/custom-select';

export default {
  name: 'ContactInquiry',
  components: {
    CustomSelect,
  },
  props: {
    value: {
      type: [Number, String],
      default: -1,
      requier: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: [
        '不具合報告',
        'tenki.jpへのご要望',
        '天気に関するお問い合わせ',
        'ビジネスに関するお問い合わせ',
        'その他',
      ],
    };
  },
  computed: {
    selectedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_mixins.scss';

.input-field-title {
  @include title-style;

  margin-bottom: 10px;
}

.input-field-body {
  margin-bottom: 25px;
}

/deep/ {
  ons-select {
    width: 100%;
  }
}
</style>
