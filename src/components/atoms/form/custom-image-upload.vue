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
          height="18px"
        >
      </div>
    </div>
    <img
      v-else
      src="@/assets/images/noimage.png"
      width="150px"
      class="image"
    >
    <div v-show="isButtonVisible">
      <v-ons-button
        class="share-button"
        @click="socialSharing()"
      >
        写真をシェア
      </v-ons-button>
    </div>

    <div v-show="!imagePath">
      <label
        class="upload-button"
        @click="showActionSheet"
      >
        写真をアップロード
      </label>
    </div>

    <v-ons-action-sheet
      :visible.sync="actionSheetVisible"
      cancelable
    >
      <v-ons-action-sheet-button @click="getPictureFromCamera">
        カメラ
      </v-ons-action-sheet-button>
      <v-ons-action-sheet-button @click="getPictureFromPhotoLibrary">
        写真
      </v-ons-action-sheet-button>
      <v-ons-action-sheet-button @click="closeActionSheet">
        キャンセル
      </v-ons-action-sheet-button>
    </v-ons-action-sheet>

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
      type: [String, Object, File],
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
      actionSheetVisible: false,
    };
  },
  computed: {
    imagePath() {
      let imagePath;
      if (typeof this.value === 'string') {
        imagePath = this.value;
      } else {
        imagePath = this.value.url || this.selectedFile.image;
      }
      return imagePath;
    },
    isButtonVisible() {
      return this.value.url ? true : false;
    },
  },
  methods: {
    socialSharing() {
      window.plugins.socialsharing.share(null, null, this.value.url, null);
    },
    getPictureFromCamera() {
      this.closeActionSheet();

      // onFailメソッドはカメラを起動して、キャンセルするときに、実行します。
      // これはエラーではないので、エラーを表示しない。ログのみをしています。
      window.navigator.camera.getPicture(this.createBase64DataUrl, this.onFail, {
        saveToPhotoAlbum: true,
        destinationType: window.navigator.camera.DestinationType.DATA_URL,
        correctOrientation: true,
      });
    },
    getPictureFromPhotoLibrary() {
      this.closeActionSheet();

      // onFailメソッドはカメラを起動して、キャンセルするときに、実行します。
      // これはエラーではないので、エラーを表示しない。ログのみをしています。
      window.navigator.camera.getPicture(this.createBase64DataUrl, this.onFail, {
        sourceType: window.navigator.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: window.navigator.camera.DestinationType.DATA_URL,
        correctOrientation: true,
      });
    },
    onFail(message) {
      console.log(message);
    },
    async createBase64DataUrl(dataUrl) {
      const base64DataURL = `data:image/gif;base64,${dataUrl}`;
      this.updateSelectedFile(base64DataURL);
    },
    updateSelectedFile(image) {
      this.$set(this.selectedFile, 'image', image);
      this.$emit('input', image);
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
    closeActionSheet() {
      this.actionSheetVisible = false;
    },
    showActionSheet() {
      this.actionSheetVisible = true;
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

.share-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  height: 24px;
  margin-top: 10px;
  font-size: 12px;
  line-height: 16px;

  &::before {
    display: inline-block;
    width: 14px;
    height: 16px;
    margin-right: 6px;
    content: '';
    background-image: url("~@/assets/images/icon-share.png");
    background-position: center;
    background-size: 100%;
  }
}
</style>
