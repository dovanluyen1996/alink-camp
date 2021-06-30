<template>
  <v-ons-card>
    <v-ons-row>
      <v-ons-col>
      </v-ons-col>
      <v-ons-col width="150px">
        <custom-image-upload
          v-model="selectedFile"
          :errors="errors"
        />
      </v-ons-col>
    </v-ons-row>
  </v-ons-card>
</template>

<script>
// components
import CustomImageUpload from '@/components/atoms/form/custom-image-upload';

export default {
  name: 'ScoreResultWeatherAndImageField',
  components: {
    CustomImageUpload,
  },
  props: {
    value: {
      type: [String, Object],
      default: () => '',
      required: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    selectedFile: {
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
/deep/ {
  .card {
    text-align: center;
  }

  .custom-input-date {
    width: 180px;
    margin: 0 auto;
  }
}
</style>
