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
    ios: 'http://sample-ios.com',
    android: 'http://sample-android.com',
  },
};
