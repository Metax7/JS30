
const clientId = import.meta.env.VITE_JS30_IDP_CLIENT_ID
const domain = import.meta.env.VITE_JS30_FULL_DOMAIN
const redirectUri = domain === 'local' ? 'http://localhost:5173' : domain.startsWith('dev') ? `http://${domain}` : `https://${domain}` 
const IdP = 'Google'
const IdPScope = 'aws.cognito.signin.user.admin email openid'
import { 
  getOpenSamlUrl,
  refreshToken,
  xChange,
  extractCode, 
  getUserInfo,
  getChallengePKCE
} from "../../authHandler"

const signInWithGoogle = () => {
  const authUrl = getOpenSamlUrl(IdP,clientId,redirectUri,IdPScope)
  const auth_code = extractCode(authUrl)
  const token = xChange(clientId,auth_code,redirectUri)
  const userId = getUserInfo(token).sub
  const userData = {
    'token': token,
    'userId': userId
  }
  return userData
}