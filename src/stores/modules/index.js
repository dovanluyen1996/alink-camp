import navigators from '@/stores/modules/navigators';
import appTabbar from '@/stores/modules/app-tabbar';
import components from '@/stores/modules/components';
import course from '@/stores/modules/course';
import courseWeather from '@/stores/modules/course-weather';
import api from '@/stores/modules/api';

export default {
  ...navigators,
  appTabbar,
  components,
  course,
  courseWeather,
  api,
};
