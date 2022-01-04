<template>
  <v-ons-page>
    <custom-toolbar
      title="オリジナルアイテム"
      :disabled-back-button="true"
    />

    <div class="content">
      <validation-observer>
        <validation-provider
          v-slot="{ errors }"
          rules="required|max:10"
          name="アイテム名"
        >
          <content-with-footer>
            <tent-name
              v-model="tentName"
              :errors="errors"
              :sticker="sticker"
            />
            <tent-sticker :sticker="sticker" />
            <template #footer>
              <v-ons-button
                modifier="cta rounded"
                class="add-button"
              >
                登録する
              </v-ons-button>
            </template>
          </content-with-footer>
        </validation-provider>
      </validation-observer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import CustomToolbar from '@/components/organisms/custom-toolbar.vue';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import TentName from '@/components/organisms/tent/name';
import TentSticker from '@/components/organisms/tent/sticker';

export default {
  name: 'TentsNew',
  components: {
    CustomToolbar,
    ContentWithFooter,
    TentName,
    TentSticker,
  },
  data() {
    return {
      tentName: '',
      sticker: {
        user_id: 1,
        labels: [
          'ラベルB',
          'ラベルA',
          'ラベルB',
        ],
      },
    };
  },
};

</script>

<style lang="scss" scoped>
/deep/ {
  .page__background {
    background-image: none;
  }
}

.add-button {
  width: 280px;
  background-color: #ff980b;
}
</style>
