<template>
  <v-ons-page>
    <custom-toolbar title="ユーザー情報の登録" />
    <div class="content">
      <base-form>
        <text-field
          v-model="confirm_code"
          title="認証コードの入力"
        />
        <template #buttons>
          <custom-submit @click="submitConfirmCode">
            認証完了
          </custom-submit>
        </template>
      </base-form>
    </div>
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import TextField from '@/components/organisms/form/text-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';

// pages
import UserInformation from '@/views/user/new/user-information';

export default {
  name: 'UserNewConfirmCode',
  components: {
    BaseForm,
    TextField,
    CustomSubmit,
  },
  data() {
    return {
      confirm_code: '',
    };
  },
  methods: {
    submitConfirmCode() {
      console.log('submitConfirmCode');
    },
  },
};
</script>
