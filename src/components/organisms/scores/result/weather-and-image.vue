<template>
  <v-ons-card>
    <v-ons-row>
      <v-ons-col>
      </v-ons-col>
      <v-ons-col width="150px">
        <custom-image-upload
          v-model="selectedFile"
          :errors="errors"
          :click-delete="showDeleteDialog"
        />
      </v-ons-col>
    </v-ons-row>

    <delete-dialog
      :is-shown.sync="isShownDeleteDialog"
      @clickDelete="clickImageDelete"
    >
      この写真を削除します。<br>
      よろしいですか？
    </delete-dialog>
  </v-ons-card>
</template>

<script>
// components
import CustomImageUpload from '@/components/atoms/form/custom-image-upload';
import DeleteDialog from '@/components/organisms/dialog/delete-dialog';

export default {
  name: 'ScoreResultWeatherAndImageField',
  components: {
    CustomImageUpload,
    DeleteDialog,
  },
  data() {
    return {
      isShownDeleteDialog: false,
    };
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
  methods: {
    showDeleteDialog() {
      this.isShownDeleteDialog = true;
    },
    clickImageDelete() {
      this.selectedFile = '';
      this.isShownDeleteDialog = false;
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
