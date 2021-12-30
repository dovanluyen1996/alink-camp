<template>
  <v-ons-page>
    <custom-toolbar
      title="アイテム設定"
      :disabled-back-button="true"
    />

    <div class="content">
      <content-with-footer>
        <tent-list
          v-if="tents.length > 0"
          :tents="tents"
        />

        <template #footer>
          <v-ons-button modifier="cta rounded red">
            <img src="@/assets/images/red-cross.png">
            アイテム追加
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import ContentWithFooter from '@/components/organisms/content-with-footer';
import TentList from '@/components/organisms/tent-list';

export default {
  name: 'TentsIndex',
  components: {
    ContentWithFooter,
    TentList,
  },
  data() {
    return {
      tents: [
        {
          name: 'オリジナルテント',
          user_id: 1,
        },
        {
          name: 'オリジナルテント',
          user_id: null,
        },
        {
          name: 'オリジナルテント',
          user_id: null,
        },
        {
          name: 'オリジナルテント',
          user_id: 2,
        },
        {
          name: 'オリジナルテント',
          user_id: 3,
        },
        {
          name: 'オリジナルテント',
          user_id: 4,
        },
        {
          name: 'オリジナルテント',
          user_id: null,
        },
        {
          name: 'オリジナルテント',
          user_id: null,
        },
        {
          name: 'オリジナルテント',
          user_id: 5,
        },
        {
          name: 'オリジナルテント',
          user_id: 6,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .page__background {
    background-image: none;
  }

  .content-with-footer {
    &__footer {
      display: flex;
      justify-content: flex-end;
    }

    .button {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
  }
}
</style>
