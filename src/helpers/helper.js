import moment from 'moment';
moment.locale('ja');

export default {
  toLongString(targetDate) {
    return moment(targetDate).format('YYYY/MM/DD (dd)');
  },
  toShortString(targetDate) {
    return moment(targetDate).format('M/D (dd)');
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
  localDateWithHyphenFrom(time) {
    return moment(time).format('YYYY-MM-DD');
  },

  isFutureTime(time) {
    return moment(time).isAfter(moment());
  },

  isEmptyObject(object) {
    return Object.keys(object).length === 0;
  },
};
