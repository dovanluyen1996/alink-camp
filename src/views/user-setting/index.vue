<template>
  <v-ons-page>
    <custom-toolbar title="設定" />
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
};
</script>
