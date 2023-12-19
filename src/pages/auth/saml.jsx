
const clientId = import.meta.env.VITE_JS30_IDP_CLIENT_ID
const domain = import.meta.env.VITE_JS30_FULL_DOMAIN
const redirectUri = domain === 'local' ? 'https://localhost:5173' : domain.startsWith('dev') ? `http://${domain}` : `https://${domain}` 
const IdP = 'Google'
const IdPScope = "aws.cognito.signin.user.admin email openid"
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
  const authUrl = getOpenSamlUrl(IdP,clientId,redirectUri,IdPScope)
  //TODO: don't forget to impement the mehtod down below
  const auth_code = extractCode(authUrl)
  const authData = xChange(clientId,auth_code,redirectUri)
  const idToken = authData.id_token
  const refreshToken = authData.refresh_token
  const accessToken = authData.access_token
  const userId = getUserInfo(accessToken).sub
  const userData = {
    'token': idToken,
    'userId': userId
  }
  return userData
}