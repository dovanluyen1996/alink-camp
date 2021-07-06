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
    <div v-show="!imagePath">
      <label class="upload-button">
        写真をアップロード
        <!-- NOTE: v-modelがtype="file"に非対応のため changeイベントで処理する
        - <input v-model="image" type="file">:
        File inputs are read only. Use a v-on:change listener instead.
        -->
        <input
          class="file-input"
          type="file"
          accept=".jpg, .jpeg, .gif, .png"
          @change="selectImage"
        >
      </label>
    </div>
    <div
      v-if="errors.length"
      class="input-error-msg"
    >
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
    // NOTE: デフォルトの動作(deleteImage)を作りたいため
    //       v-on:clickではなくPropsで渡している
    clickDelete: {
      type: Function,
      default: () => null,
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
      let imagePath;
      // NOTE: 画像登録済みの場合はpropsでパスが渡ってくると想定している
      if (typeof this.value === 'string') {
        imagePath = this.value;
      } else {
        imagePath = this.selectedFile.image;
      }
      return imagePath;
    },
  },
  methods: {
    selectImage(e) {
      const image = e.target.files[0];
      this.createImage(image);
    },
    createImage(image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.updateSelectedFile(reader.result);
      };
    },
    updateSelectedFile(image) {
      this.$set(this.selectedFile, 'image', image);
      this.$emit('input', this.selectedFile);
    },
    deleteImage() {
      const result = this.clickDelete();
      if (result !== null) return;

      this.$emit('input', '');
      this.$set(this.selectedFile, 'image', null);
      // NOTE: v-bindでvalueをバインドさせても書き換わらないためDOM操作する
      //       原因はおそらくtype="file"が読み取り専用のため
      this.$el.querySelector('.file-input').value = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.custom-image-upload {
  text-align: center;
}

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
  font-size: $font-size-small;
  font-weight: 600;
  color: #0061ca;
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
