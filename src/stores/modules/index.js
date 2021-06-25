import navigators from '@/stores/modules/navigators';
import appTabbar from '@/stores/modules/app-tabbar';
import course from '@/stores/modules/course';
import api from '@/stores/modules/api';

export default {
  ...navigators,
  appTabbar,
  course,
  api,
};
