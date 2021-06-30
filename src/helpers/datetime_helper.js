import moment from 'moment';
import 'moment-timezone';

export default class DateTimeHelper {
  static momentWithTimezoneOf(time) {
    return moment(time).tz('Asia/Tokyo');
  }

  // 画面で表示するため
  static localDateFrom(time) {
    return this.momentWithTimezoneOf(time).format('YYYY/MM/DD');
  }

  static localTimeFrom(time) {
    return this.momentWithTimezoneOf(time).format('HH:mm');
  }

  // 日付を取得するため。javascriptにはyyyy-mm-ddのフォーマットを使わないといけないです。
  static localDateWithHyphenFrom(time) {
    return this.momentWithTimezoneOf(time).format('YYYY-MM-DD');
  }
}
