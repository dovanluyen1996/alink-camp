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
  toLongStringWithoutDayOfWeek(targetDate) {
    const date = new Date(targetDate);
    const year = date.getFullYear();
    const month = (`00${(date.getMonth() + 1)}`).slice(-2);
    const day = (`00${date.getDate()}`).slice(-2);

    return `${year}/${month}/${day}`;
  },
  toTimeString(targetAt) {
    const date = new Date(targetAt);
    const hour = (`00${date.getHours()}`).slice(-2);
    const minutes = (`00${date.getMinutes()}`).slice(-2);

    return `${hour}:${minutes}`;
  },
};
