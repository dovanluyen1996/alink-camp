<template>
  <v-ons-page>
    <custom-toolbar title="設定" />
    <loading :visible="isLoading" />
    <div class="content">
      <user-setting-list />
    </div>
  </v-ons-page>
</template>

<script>
// components
import UserSettingList from '@/components/organisms/user-setting/list';

export default {
  name: 'UserSetting',
  components: {
    UserSettingList,
  },
  computed: {
    isLoading() {
      return this.$store.getters['models/userSetting/isLoading']
        || this.$store.getters['purchase/isLoading'];
    },
  },
};
</script>
