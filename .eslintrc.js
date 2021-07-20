module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    cordova: true,
    FirebasePlugin: true,
    Adjust: true,
    AdjustConfig: true,
    AdjustEvent: true,
    Purchases: true,
    BuildInfo: true,
  },
  plugins: [
    'vue',
  ],
  rules: {
    // console.xxxの使用を許可する
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/html-self-closing': ['error', {
      html: {
        // 通常のhtmlタグで「<span></span>」のようなものは、中身が空でも「<span/>」でなくても良いこととする
        normal: 'any',
      },
    }],
    // computedのメソッドでreturnなしのものを許可する
    'vue/return-in-computed-property': 0,
    // functionもしくは関数名と()の間のスペースを空けないようにする
    'space-before-function-paren': ['error', 'never'],
    // 無名関数を許可
    'func-names': 0,
    // 戻り値を変数に格納しない「new Xxx()」という書き方を許可する
    'no-new': 0,
    // アロー関数の() {}の使い方
    'arrow-parens': [2, 'as-needed', {
      requireForBlockBody: true,
    }],
    // 関数内で、引数のオブジェクトのプロパティへ再代入することを許可する
    'no-param-reassign': 0,
    // ↓ see: https://github.com/houndci/hound/issues/1419#issuecomment-328727830
    // 「import '@/xxxx'」という記法を許可する
    'import/extensions': 0,
    // 「import '@/xxxx'」が解決できないというエラーを無視する
    'import/no-unresolved': 0,
    'import/named': 0,
    // switchとcaseは同じインデントにする
    indent: ['error', 2],
    'no-mixed-operators': ['error', {
      allowSamePrecedence: true,
    }],
    'no-await-in-loop': 'off',
    'no-unneeded-ternary': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
