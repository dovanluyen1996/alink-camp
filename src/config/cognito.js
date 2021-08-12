export default {
  Region: process.env.COGNITO_REGION,
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID,
  UserPoolDomain: process.env.COGNITO_USER_POOL_DOMAIN,
  ResponseType: process.env.COGNITO_RESPONSE_TYPE,
  CallbackUrl: process.env.COGNITO_CALLBACK_URL,
  OauthFlow: process.env.COGNITO_OAUTH_FLOW,
  // IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
};
