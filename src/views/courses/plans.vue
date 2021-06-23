<template>
  <v-ons-page>
    <custom-toolbar
      :title="title"
      subtitle="（予定日設定）"
    >
      <template #right>
        <div
          v-if="isCanDelete"
          class="delete-plan"
          @click="openDeleteDialog"
        >
          <img
            src="@/assets/images/trash.png"
            width="24px"
            alt="予定を削除"
          >
        </div>
      </template>
    </custom-toolbar>

    <div class="content">
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
    </div>

    <v-ons-alert-dialog
      :visible="isShownDeleteDialog"
    >
      <template #title>
        削除確認
      </template>

      この予定日設定を削除します。<br>
      よろしいですか？

      <template #footer>
        <v-ons-button
          modifier="quiet quiet-dark"
          @click="closeDeleteDialog"
        >
          キャンセル
        </v-ons-button>
        <v-ons-button @click="deletePlans">
          削除する
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
// components
import DateField from '@/components/organisms/form/date-field';
import TimeField from '@/components/organisms/form/time-field';

export default {
  name: 'CoursePlans',
  components: {
    DateField,
    TimeField,
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
    openDeleteDialog() {
      this.isShownDeleteDialog = true;
    },
    closeDeleteDialog() {
      this.isShownDeleteDialog = false;
    },
    deletePlans() {
      console.log('delete plans');
      this.closeDeleteDialog();
    },
    update() {
      console.log('update plans');
    },
  },
};
</script>

<style scoped lang="scss">
.delete-plan {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: 8px 6px;
}

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
