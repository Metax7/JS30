import { 
  refreshToken,
  xChange,
  extractCode, 
  getUserInfo,
  getChallengePKCE,
  getState,
  revokeToken
} from "../../authHandler"

const IdP = 'Google'
const GoogleScope = import.meta.env.VITE_JS30_GOOGLE_SCOPE
import { useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
/**
 * Sign in with Google Account
 *  @see https://docs.aws.amazon.com/cognito/latest/developerguide/user-pools-API-operations.html
 *  @see https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html
 *  @returns {object} userData conisting of {string} idToken and {string} userId
 *  
 */
export const signInOIDC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const authCode = new URLSearchParams(location.search).get('code')
  if (authCode) {
    const authData = xChange(authCode)
    localStorage.setItem('authData', JSON.stringify(authData))
    const userInfo = getUserInfo(authData.access_token)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    const userData = { 
      idToken : userInfo.id_token,
      userId : userInfo.username
    }
    localStorage.setItem('userData', JSON.stringify(userData))
    navigate('/')
  }
  return <></>
}
