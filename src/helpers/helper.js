export default {
  toLongString(targetDate) {
    const date = new Date(targetDate);
    const year = date.getFullYear();
    const month = (`00${(date.getMonth() + 1)}`).slice(-2);
    const day = (`00${date.getDate()}`).slice(-2);
    const dayOfWeekStr = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(date);
    return `${year}/${month}/${day} (${dayOfWeekStr})`;
  },
};
