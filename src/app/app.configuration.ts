export const Configuration = {

  identityPoolId : process.env.IDENTITY_POOL_ID,

  poolData : {
    UserPoolId : process.env.USER_POOL_ID,
    ClientId : process.env.CLIENT_ID
  },

  identityLoginKey : 'cognito-idp.us-east-1.amazonaws.com/' + process.env.USER_POOL_ID,

  dynamoDbTable: process.env.DYNAMODB_TABLE

};
