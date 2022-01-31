import navigators from '@/stores/modules/navigators';
import appTabbar from '@/stores/modules/app-tabbar';
import components from '@/stores/modules/components';
import campsite from '@/stores/modules/campsite';
import api from '@/stores/modules/api';

export default {
  ...navigators,
  appTabbar,
  components,
  campsite,
  api,
};
