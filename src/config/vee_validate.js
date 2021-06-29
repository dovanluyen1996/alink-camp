import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
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
  if (value && (typeof value === 'string' || value >= 0)) {
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
