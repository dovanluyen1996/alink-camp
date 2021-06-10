<template>
  <v-ons-page>
    <custom-toolbar title="利用規約" />
    <div class="background" />
    <div class="content">
      <terms-of-service-text-data />
    </div>
    <ons-bottom-toolbar modifier="transparent">
      <v-ons-button
        class="button-disagree"
        @click="disagree"
      >
        同意しない
      </v-ons-button>
      <v-ons-button @click="clickAgree">
        同意する
      </v-ons-button>
    </ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import TermsOfServiceTextData from '@/components/organisms/terms-of-service/text-data.vue';

export default {
  name: 'App',
  components: {
    TermsOfServiceTextData,
  },
  methods: {
    disagree() {
      this.$store.dispatch('appNavigator/pop');
    },
    clickAgree() {
      console.log('clickAgree');
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  background: #fff;
}

.content {
  padding: 20px;
  font-size: 16px;
}

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .button {
    width: 140px;
    font-size: 16px;
  }

  .button-disagree {
    margin-right: 20px;
    color: #010910;
    background: #d9d9d9;
  }
}
</style>
