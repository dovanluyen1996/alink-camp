import { extend } from 'vee-validate';
import {
  required, email, max,
} from 'vee-validate/dist/rules';
import moment from 'moment';
import settings from '@/config/settings';

extend('required', {
  ...required,
  message: '{_field_}を入力してください',
});

extend('email', {
  ...email,
  message: '{_field_}は不正な値です',
});

extend('required-select', (value) => {
  if ((typeof value === 'string' && value.length) || value >= 0) {
    return true;
  }

  return '{_field_}を選択してください';
});

extend('password', (value) => {
  if (value && value.match(settings.regex.password)) {
    return true;
  }

  return 'パスワードの条件を満たしていません';
});

extend('required-future-day', (value) => {
  if (value && moment(value).isSameOrAfter(moment(), 'day')) {
    return true;
  }

  return `${moment().format('YYYY/MM/DD')}より後を指定してください`;
});

extend('required-past-day', (value) => {
  if (value && moment(value).isSameOrBefore(moment(), 'day')) {
    return true;
  }

  return `${moment().format('YYYY/MM/DD')}より前を指定してください`;
});

extend('required-one-year-later', (value) => {
  if (value && moment(value).isSameOrBefore(moment().add(1, 'year'), 'day')) {
    return true;
  }

  return `${moment().add(1, 'year').format('YYYY/MM/DD')}より前を指定してください`;
});

extend('max', {
  ...max,
  message: '{_field_}は{length}文字以内で入力してください',
});

extend('lteq-total-score', {
  params: ['maxValue'],
  validate(value, { maxValue }) {
    return value <= maxValue;
  },
  message: '合計打数オーバー',
});
