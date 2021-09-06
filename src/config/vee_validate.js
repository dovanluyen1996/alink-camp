import { extend } from 'vee-validate';
import {
  required, email, max,
} from 'vee-validate/dist/rules';
import settings from '@/config/settings';
import moment from 'moment';

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

extend('max', {
  ...max,
  message: '{_field_}は{length}文字以内で入力してください',
});
