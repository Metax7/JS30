const cognitoHost = import.meta.env.VITE_JS30_AUTHORIZER_URL
const clientId = import.meta.env.VITE_JS30_IDP_CLIENT_ID
const domain = import.meta.env.VITE_JS30_FULL_DOMAIN
const redirectUri = domain === 'local' ? 'http://localhost:5173' : domain.startsWith('dev') ? `http://${domain}` : `https://${domain}` 
const IdP = 'Google'

const getOpenSamlUrl = () => {

  return `${cognitoHost}/oauth2/authorize?identity_provider=${IdP}&response_type=CODE&client_id=${clientId}&redirect_uri=${redirectUri}&scope=aws.cognito.signin.user.admin email openid`
}