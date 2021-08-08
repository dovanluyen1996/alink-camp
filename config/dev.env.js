'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:3000/api"',
  COGNITO_REGION: '"ap-northeast-1"',
  COGNITO_USER_POOL_ID: '"ap-northeast-1_rLveCQoVL"',
  COGNITO_CLIENT_ID: '"19jnv9ec3lnlfd57f3hnrnv7pg"',
  ADJUST_TOKEN: '"ko4d8l3mary8"',
  ADJUST_TRIAL_STARTED_EVENT_ID: '"40mx5t"',
  ADJUST_TUTORIAL_COMPLETED_EVENT_ID: '"rgb7xb"',
  ADJUST_REGISTRATION_COMPLETED_EVENT_ID: '"n1mmjs"',
  REVENUE_CAT_PBK: '"SNsgQjraXSJtWBSQBRPIQOrPzMkCbtVY"',
  REVENUE_CAT_ENTITLEMENT_USE_APP: '"use App"',
  // COGNITO_IDENTITY_POOL_ID: '"ap-northeast-1:XXXXXXXX-YYYY-XXXX-YYYY-XXXXXXXXXXXX"',
});
