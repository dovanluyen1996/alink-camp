<template>
  <v-ons-page @show="show">
    <custom-toolbar
      title="コース検索"
      :disabled-back-button="true"
    />

    <div class="content">
      <content-with-footer>
        <tent-list
          v-if="tents.length > 0"
          :tents="tents"
        />

        <template #footer>
          <v-ons-button
            modifier="cta rounded red"
          >
            <v-ons-icon icon="fa-plus" />
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
      text-align: right;
    }

    .button {
      margin-right: 20px;
    }
  }
}
</style>
