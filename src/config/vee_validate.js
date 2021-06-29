import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_}を入力してください',
});

extend('email', {
  ...email,
  message: '{_field_}は不正な値です',
});

extend('required-select', (value) => {
  if (typeof value === 'string' || value >= 0) {
    return true;
  }

  return '{_field_}を選択してください';
});
