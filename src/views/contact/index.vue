<template>
  <v-ons-page>
    <div>
      <div>
        お問い合わせ

        <!-- TODO: Add real category -->
        <select v-model="contact.category">
          <option>How to use app</option>
          <option>Infomation</option>
        </select>
      </div>

      <div>
        内容
        <input
          v-model="contact.message"
        >
      </div>

      <v-ons-button @click="sendContact">
        送信確認
      </v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        message: '',
        category: '',
      },
    };
  },
  methods: {
    async sendContact() {
      // TODO: Add real information app when release
      const appVersion = '1';
      const osVersion = '14.3';
      const deviceName = 'iphone5';
      const platform = 'iOS';
      const params = {
        ...this.contact,
        deviceName,
        appVersion,
        osVersion,
        platform,
      };
      await this.$store.dispatch('models/contact/sendContact', params);
    },
  },
};
</script>
