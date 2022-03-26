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
  name: 'CampsitePlanImage',
  components: {
    CustomImageUpload,
    DeleteDialog,
  },
  props: {
    value: {
      type: [String, Object, File],
      default: () => '',
      required: true,
    },
    date: {
      type: String,
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
        this.$emit('updateImage', this.date, newValue);
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

.custom-image-upload {
  margin-top: 5px;
}

/deep/ {
  .upload-button {
    margin-bottom: -20px;
  }
}
</style>
