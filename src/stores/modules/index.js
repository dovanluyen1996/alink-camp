import navigators from '@/stores/modules/navigators';
import appTabbar from '@/stores/modules/app-tabbar';
import components from '@/stores/modules/components';
import campsite from '@/stores/modules/campsite';
import course from '@/stores/modules/course';
import plan from '@/stores/modules/plan';
import api from '@/stores/modules/api';
import purchase from '@/stores/modules/purchase';

export default {
  ...navigators,
  appTabbar,
  components,
  campsite,
  course,
  plan,
  api,
  purchase,
};
