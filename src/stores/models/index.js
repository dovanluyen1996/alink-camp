import notice from './notice';
import termsOfService from './terms_of_service';
import privacyPolicy from './privacy_policy';
import help from './help';
import gift from './gift';
import userGift from './user_gift';
import sponsor from './sponsor';
import currentUser from './current_user';
import course from './course';
import userStamp from './user_stamp';
import userCourse from './user_course';
import userSetting from './user_setting';
import userCoursePlan from './user_course_plan';
import contact from './contact';
import userCourseResult from './user_course_result';
import weather from './weather';
import appStart from './app_start';
import subscription from './subscription';
import campsite from './campsite';
import usersFavorite from './users_favorite';
import label from './label';
import item from './item';
import spot from './spot';

export default {
  strict: true,
  namespaced: true,
  modules: {
    notice,
    termsOfService,
    privacyPolicy,
    help,
    gift,
    userGift,
    sponsor,
    currentUser,
    course,
    userStamp,
    userCourse,
    userSetting,
    userCoursePlan,
    contact,
    userCourseResult,
    weather,
    appStart,
    subscription,
    campsite,
    usersFavorite,
    label,
    item,
    spot,
  },
};
