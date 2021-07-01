export default {
  toLongString(targetDate) {
    const date = new Date(targetDate);
    const year = date.getFullYear();
    const month = (`00${(date.getMonth() + 1)}`).slice(-2);
    const day = (`00${date.getDate()}`).slice(-2);
    const dayOfWeekStr = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(date);
    return `${year}/${month}/${day} (${dayOfWeekStr})`;
  },
  toShortString(targetDate) {
    const date = new Date(targetDate);
    const month = date.getMonth() + 1;
    const day = (`00${date.getDate()}`).slice(-2);
    const dayOfWeekStr = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(date);
    return `${month}/${day} (${dayOfWeekStr})`;
  },
  toDateTimeString(targetAt) {
    const date = new Date(targetAt);
    const year = date.getFullYear();
    const month = (`00${(date.getMonth() + 1)}`).slice(-2);
    const day = (`00${date.getDate()}`).slice(-2);
    const hour = (`00${date.getHours()}`).slice(-2);
    const minutes = (`00${date.getMinutes()}`).slice(-2);
    return `${year}/${month}/${day} ${hour}:${minutes}`;
  },
  toDate(targetAt) {
    const date = new Date(targetAt);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day);
  },
};
