import { 
  getOpenSamlUrl,
  refreshToken,
  xChange,
  extractCode, 
  getUserInfo,
  getChallengePKCE,
  getState,
  revokeToken
} from "../../authHandler"
/**
 * Sign in with Google Account
 *  @see https://docs.aws.amazon.com/cognito/latest/developerguide/user-pools-API-operations.html
 *  @see https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html
 *  @returns {object} userData conisting of {string} idToken and {string} userId
 *  
 */
export const signInWithGoogle = () => {
  const IdP = 'Google'
  const IdPScope = "aws.cognito.signin.user.admin email openid"
  const authData = samlSignIn(IdP,IdPScope)
  // const idToken = authData.id_token
  // //const refreshToken = authData.refresh_token
  // const accessToken = authData.access_token
  // const userId = getUserInfo(accessToken).sub
  // const userData = {
  //   'token': idToken,
  //   'userId': userId
  // }
  // return userData
}
export const singInWithFacebook = () => {}

const samlSignIn = (IdP, IdPScope) => {
  const authUrl = getOpenSamlUrl(IdP,IdPScope)
  console.log("AUTHURL " + authUrl)
  // const auth_code = extractCode(authUrl)
  // const authData = xChange(auth_code)
  // return authData
  return authUrl
}