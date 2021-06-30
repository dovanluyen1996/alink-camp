<template>
  <div class="custom-image-upload">
    <img
      v-if="imagePath"
      :src="imagePath"
      class="image"
    >
    <img
      v-else
      src="@/assets/images/noimage.png"
      width="150px"
      class="image"
    >
    <div>
      <label class="upload-button">
        写真をアップロード
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
      imagePath: null,
    };
  },
  computed: {
    hasImage() {
      return typeof this.value === 'string' && this.value !== '';
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
        this.selectedFile.image = reader.result;
        this.imagePath = this.selectedFile.image;
        this.$emit('input', this.selectedFile);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.image-field {
  text-align: center;
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
