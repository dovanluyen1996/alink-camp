<template>
  <div class="custom-image-upload">
    <div
      v-if="imagePath"
      class="image-content"
    >
      <img
        :src="imagePath"
        class="image"
      >
      <div
        class="delete-image"
        @click="deleteImage"
      >
        <img
          src="@/assets/images/form/delete.png"
          width="18px"
        >
      </div>
    </div>
    <img
      v-else
      src="@/assets/images/noimage.png"
      width="150px"
      class="image"
    >
    <div>
      <label class="upload-button">
        写真をアップロード
        <!-- NOTE: v-modelがtype="file"に非対応のため changeイベントで処理する
        - <input v-model="image" type="file">:
        File inputs are read only. Use a v-on:change listener instead.
        -->
        <input
          class="file-input"
          type="file"
          @change="onImageUploaded"
        >
      </label>
    </div>
    <div v-if="errors.length">
      {{ errors[0] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomImageUpload',
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
      selectedFile: {
        title: '',
        description: '',
        image: null,
      },
    };
  },
  computed: {
    imagePath() {
      return this.selectedFile.image;
    },
  },
  methods: {
    onImageUploaded(e) {
      const image = e.target.files[0];
      this.createImage(image);
    },
    createImage(image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.updateImage(reader.result);
      };
    },
    updateImage(image) {
      this.$set(this.selectedFile, 'image', image);
      this.$emit('input', this.selectedFile);
    },
    deleteImage() {
      this.$emit('input', '');
      this.$set(this.selectedFile, 'image', null);
      this.$el.querySelector('.file-input').value = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.image-field {
  text-align: center;
}

.image-content {
  position: relative;
  display: inline-block;
}

.delete-image {
  position: absolute;
  top: -20px;
  right: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.image {
  max-width: 100%;
  vertical-align: bottom;
}

.upload-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: #0061ca;
  font-size: $font-size-small;
  font-weight: 600;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>