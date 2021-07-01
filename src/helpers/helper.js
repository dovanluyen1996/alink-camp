import moment from 'moment';

moment.locale('ja');

export default {
  toLongString(targetDate) {
    return moment(targetDate).format('YYYY/MM/DD (dd)');
  },
  toShortString(targetDate) {
    return moment(targetDate).format('M/D (dd)');
  },
};
