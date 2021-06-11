import notice from './notice';
import termOfService from './term_of_service';
import privacyPolicy from './privacy_policy';
import help from './help';
import gift from './gift';

export default {
  strict: true,
  namespaced: true,
  modules: {
    notice,
    termOfService,
    privacyPolicy,
    help,
    gift,
  },
};
