<template>
  <v-ons-page>
    <custom-toolbar title="設定" />
    <div class="content">
      <user-setting-list
        title="PUSH設定"
        :user-setting="userSetting"
        @updateUserSetting="updateUserSetting"
      />
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
    userSetting() {
      return this.$store.getters['models/userSetting/userSetting'];
    },
  },
  async created() {
    await this.getUserSetting();
  },
  methods: {
    async getUserSetting() {
      await this.$store.dispatch('models/userSetting/getUserSetting');
    },
    async updateUserSetting(userSetting) {
      try {
        await this.$store.dispatch('models/userSetting/updateUserSetting', userSetting);
      } catch (e) {
        this.getUserSetting();
      }
    },
  },
};
</script>
