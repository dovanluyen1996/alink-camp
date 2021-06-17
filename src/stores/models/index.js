import notice from './notice';
import termOfService from './term_of_service';
import privacyPolicy from './privacy_policy';
import help from './help';
import gift from './gift';
import userGift from './user_gift';
import sponsor from './sponsor';
import currentUser from './current_user';
import course from './course';

export default {
  strict: true,
  namespaced: true,
  modules: {
    notice,
    termOfService,
    privacyPolicy,
    help,
    gift,
    userGift,
    sponsor,
    currentUser,
    course,
  },
};
