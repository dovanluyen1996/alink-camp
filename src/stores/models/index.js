import notice from './notice';
import termOfService from './term_of_service';
import privacyPolicy from './privacy_policy';

export default {
  strict: true,
  namespaced: true,
  modules: {
    notice,
    termOfService,
    privacyPolicy,
  },
};
