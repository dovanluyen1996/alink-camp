'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:3000/api"',
  COGNITO_REGION: '"ap-northeast-1"',
  COGNITO_USER_POOL_ID: '"ap-northeast-1_rLveCQoVL"',
  COGNITO_CLIENT_ID: '"19jnv9ec3lnlfd57f3hnrnv7pg"',
  // COGNITO_IDENTITY_POOL_ID: '"ap-northeast-1:XXXXXXXX-YYYY-XXXX-YYYY-XXXXXXXXXXXX"',
})
