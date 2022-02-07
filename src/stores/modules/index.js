import navigators from '@/stores/modules/navigators';
import appTabbar from '@/stores/modules/app-tabbar';
import components from '@/stores/modules/components';
import course from '@/stores/modules/course';
import plan from '@/stores/modules/plan';
import api from '@/stores/modules/api';

export default {
  ...navigators,
  appTabbar,
  components,
  course,
  plan,
  api,
};
