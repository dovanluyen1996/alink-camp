import views from '@/config/views';

export default {
  api: {
    url: process.env.API_URL,
    timeout: 200000,
  },
  localStorage: {
    keys: {
      session: 'session',
    },
  },
  views,
  authorization: {
    accessToken: {
      header: 'Authorization',
      valuePrefix: 'Bearer',
    },
  },
  regex: {
    password: /^(?=.*?[a-z])(?=.*?\d).{6,}$/,
  },
  app_store: {
    // TODO: Change real link
    ios: 'https://itunes.apple.com/jp/app/id1584902038?mt=8',
    android: 'https://play.google.com/store/apps/details?id=jp.or.jwa.tenkijp.golf',
  },
  locationServices: {
    timeout: 30000,
  },
};
