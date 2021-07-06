<template>
  <v-ons-page>
    <custom-toolbar
      :title="title"
      subtitle="（予定日設定）"
    >
      <template #right>
        <delete-dialog-with-icon
          v-if="isCanDelete"
          :is-shown.sync="isShownDeleteDialog"
          @clickDelete="deletePlans"
        >
          この予定日設定を削除します。<br>
          よろしいですか？
        </delete-dialog-with-icon>
      </template>
    </custom-toolbar>

    <div class="content">
      <content-with-footer>
        <date-field
          v-model="dateValue"
          title="プレイ予定日（必須）"
          placeholder="予定日を選択"
          help="※天気予報のPUSHは予報が確定してからになります"
        />
        <time-field
          v-model="timeValue"
          title="プレイ開始時刻"
          placeholder="時刻設定"
        />

        <template #footer>
          <v-ons-button
            modifier="large--cta rounded"
            @click="update"
          >
            設定完了
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';
import DateField from '@/components/organisms/form/date-field';
import TimeField from '@/components/organisms/form/time-field';
import ContentWithFooter from '@/components/organisms/content-with-footer';

export default {
  name: 'CoursePlans',
  components: {
    DeleteDialogWithIcon,
    DateField,
    TimeField,
    ContentWithFooter,
  },
  data() {
    return {
      title: '〇〇ゴルフ場',
      dateValue: '',
      timeValue: '',
      isShownDeleteDialog: false,
    };
  },
  computed: {
    isCanDelete() {
      // TODO: 予定登録されているか判定してください
      return true;
    },
  },
  methods: {
    deletePlans() {
      console.log('delete plans');
      this.isShownDeleteDialog = false;
    },
    update() {
      console.log('update plans');
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ {
  .card {
    text-align: center;
  }

  .custom-input-date {
    width: auto;
    min-width: 180px;
  }

  .date-field-help {
    text-align: left;
  }
}
</style>
