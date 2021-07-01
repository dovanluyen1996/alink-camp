<template>
  <v-ons-col class="course-image-col">
    <custom-image-upload
      v-model="selectedFile"
      :errors="errors"
      :click-delete="showDeleteDialog"
    />

    <delete-dialog
      :is-shown.sync="isShownDeleteDialog"
      @clickDelete="deleteImage"
    >
      この写真を削除します。<br>
      よろしいですか？
    </delete-dialog>
  </v-ons-col>
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
  data() {
    return {
      isShownDeleteDialog: false,
    };
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
    deleteImage() {
      this.selectedFile = '';
      this.isShownDeleteDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.custom-image-upload {
  margin-top: 5px;
}

/deep/ {
  .custom-input-date {
    width: 180px;
    margin: 0 auto;
  }

  .upload-button {
    margin-bottom: -20px;
  }
}
</style>
