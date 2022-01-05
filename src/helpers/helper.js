import moment from 'moment';
import ApiClient from '@/api_client';
import settings from '@/config/settings';

moment.locale('ja');

export default {
  toLongString(targetDate) {
    return moment(targetDate).format('YYYY/MM/DD (dd)');
  },
  toShortString(targetDate) {
    return moment(targetDate).format('M/D (dd)');
  },
  toShortDayString(targetDate) {
    return moment(targetDate).format('MM/DD (dd)');
  },
  toDayString(targetDate) {
    if (!targetDate) return '';
    return moment(targetDate).format('DD日 (dd)');
  },
  toWeekDayString(targetDate) {
    if (!targetDate) return '';
    return moment(targetDate).format('DD（dd）');
  },
  toShortWithTimeString(targetDate) {
    if (!targetDate) return '';
    return moment(targetDate).format('MM月DD日hh:mm');
  },

  getImage(filePath) {
    try {
      // NOTE: 画像のため依存関係が明らかなのでrequireのルールを除外
      //       枚数も多いので従うと却って見づらくなる
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/images/${filePath}`);
    } catch (e) {
      // console.error(`天気画像ファイル（${file_path}）の読み込みに失敗しました`);
      console.error(e);
      return null;
    }
  },

  // 画面で表示するため
  localDateFrom(time) {
    return moment(time).format('YYYY/MM/DD');
  },

  localTimeFrom(time) {
    return moment(time).format('HH:mm');
  },

  // 日付を取得するため。javascriptにはyyyy-mm-ddのフォーマットを使わないといけないです。
  localDateWithHyphenFrom(targetDate) {
    return moment(targetDate).format('YYYY-MM-DD');
  },

  isFutureTime(time) {
    return moment(time).isAfter(moment());
  },

  isEmpty(value) {
    return !value && value !== 0;
  },

  isEmptyObject(object) {
    return Object.keys(object).length === 0;
  },

  isPresentObject(object) {
    return Object.keys(object).length > 0;
  },

  isAfterDate(compareDate, targetDate) {
    return moment(compareDate).isAfter(targetDate);
  },

  isSaturday(date) {
    return moment(date).isoWeekday() === 6;
  },

  isSunday(date) {
    return moment(date).isoWeekday() === 7;
  },

  // デバイストークンを送信する
  async createUserDevise() {
    if (window.device.platform === 'iOS') {
      FirebasePlugin.getAPNSToken(async(token) => {
        if (!token) return;

        const params = { os: 'ios', token };
        await ApiClient.createUserDevise(params);
      }, (error) => {
        console.error(error);
      });
    } else if (window.device.platform === 'Android') {
      FirebasePlugin.getToken(async(token) => {
        if (!token) return;

        const params = { os: 'android', token };
        await ApiClient.createUserDevise(params);
      }, (error) => {
        console.error(error);
      });
    }
  },

  // PUSH通知の権限確認
  callPushNotificationPermission() {
    if (window.device.platform !== 'browser') {
      window.FirebasePlugin.hasPermission(async(hasPermission) => {
        if (hasPermission) {
          await this.createUserDevise();
        } else {
          window.FirebasePlugin.grantPermission(async(permissionGranted) => {
            // 選択直後では設定がまだ反映されていないため、3秒遅延させる（ユーザの操作に影響はない）
            if (permissionGranted) {
              setTimeout(async() => {
                await this.createUserDevise();
              }, 3000);
            }
          }, (error) => {
            console.error(error);
          });
        }
      });
    }
  },

  // 位置情報の権限確認
  callGeolocationPermission() {
    navigator.geolocation.getCurrentPosition(
      () => {}, (error) => {
        console.log(error);
      }, {
        timeout: settings.locationServices.timeout,
      },
    );
  },

  openPageByUrl(url) {
    if (window.device.platform === 'iOS') {
      window.SafariViewController.show({
        url,
      });
    } else {
      window.open(url, '_system');
    }
  },
};
