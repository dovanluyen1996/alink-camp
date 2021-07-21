import moment from 'moment';

moment.locale('ja');

export default {
  toLongString(targetDate) {
    return moment(targetDate).format('YYYY/MM/DD (dd)');
  },
  toShortString(targetDate) {
    return moment(targetDate).format('M/D (dd)');
  },
  toDayString(targetDate) {
    if (!targetDate) return '';
    return moment(targetDate).format('DD日 (dd)');
  },
  toWeekDayString(targetDate) {
    if (!targetDate) return '';
    return moment(targetDate).format('DD（dd）');
  },
  toShortWithTimeString(targetDate) {
    if (!targetDate) return '';
    return moment(targetDate).format('MM月DD日hh:mm');
  },

  getImage(filePath) {
    try {
      // NOTE: 画像のため依存関係が明らかなのでrequireのルールを除外
      //       枚数も多いので従うと却って見づらくなる
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/images/${filePath}`);
    } catch (e) {
      // console.error(`天気画像ファイル（${file_path}）の読み込みに失敗しました`);
      console.error(e);
      return null;
    }
  },

  // 画面で表示するため
  localDateFrom(time) {
    return moment(time).format('YYYY/MM/DD');
  },

  localTimeFrom(time) {
    return moment(time).format('HH:mm');
  },

  // 日付を取得するため。javascriptにはyyyy-mm-ddのフォーマットを使わないといけないです。
  localDateWithHyphenFrom(targetDate) {
    return moment(targetDate).format('YYYY-MM-DD');
  },

  isFutureTime(time) {
    return moment(time).isAfter(moment());
  },

  isEmptyObject(object) {
    return Object.keys(object).length === 0;
  },

  isPresentObject(object) {
    return Object.keys(object).length > 0;
  },

  isAfterDate(compareDate, targetDate) {
    return moment(compareDate).isAfter(targetDate);
  },
};
