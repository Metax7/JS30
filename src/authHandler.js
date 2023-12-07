import { getOAuth, postOAuth } from './client'

const tokenUrlSuffix = '/oauth2/token'
const infoUrlSuffix = '/oauth2/userInfo'
const oauth2Headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
const codeChallengeMethod = 'S256'

// TODO: Wrap everything in TryCatch

/**
 * 
 * @param {string} IdentityProvider - name of Identity Provider such as Google, Facebook etc
 * @param {string} clientId - id of Application Client registered in Cognito Userpool
 * @param {string} redirectUri - uri to be redirected - The URL where the authentication server redirects the browser after Amazon Cognito authorizes the user.
 * @param {string} scope - Can be a combination of any system-reserved scopes or custom scopes that are associated with a client. Scopes must be separated by spaces.
 * @param {string} state - Additional computed value to guard against CSRF attacks.
 * @param {string} codeChallenge - The challenge that you generated from the code_verifier. Use for PKCE
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc7636
 * 
 * @returns {string} callback url with Authorization Code
 */
export const getOpenSamlUrl = (
    IdentityProvider,
    clientId,
    redirectUri,
    scope,
    state,
    codeChallenge) => {

const authorizeUrlSuffix =  '/oauth2/authorize'
const params = {}
params.append("identity_provider", IdentityProvider)
params.append("response_type", "CODE")
params.append("client_id", clientId)
params.append("redirect_uri", redirectUri)
params.append("scope", scope)
if (state !== undefined && state!== null) {
    params.append("STATE", state)
}
if (codeChallenge !== undefined && codeChallenge !== null) {
        params.append("code_challenge_method", codeChallengeMethod)
        params.append("code_challenge", codeChallenge)
    }


getOAuth(authorizeUrlSuffix, params)
    
// const ff = `${cognitoHost}/oauth2/authorize?identity_provider=${IdentityProvider}
// &response_type=CODE&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
    
}
/**
 * 
 * @param {*} clientId - id of Application Client registered in Cognito Userpool
 * @param {*} authorizationCode - code of grant_type to be exchanged to Authorization Token
 * @param {*} redirectUri - Must be the same redirect_uri that was used to get authorization_code in /oauth2/authorize.
 * @param {*} codeVerifier - The proof key. Required if the authorization code was requested with PKCE.
 * 
 * @returns {string}  {
                        "access_token":"eyJra1example", 
                        "id_token":"eyJra2example",
                        "refresh_token":"eyJj3example",
                        "token_type":"Bearer", 
                        "expires_in":3600
                            }
 */
export const xChange = async (
    clientId,
    authorizationCode,
    redirectUri,
    codeVerifier) => {
    const body = {}
    body.append('grant_type','authorization_code')
    body.append('client_id', clientId)
    body.append('code', authorizationCode)
    body.append('redirect_uri', redirectUri)

    if(codeVerifier!==undefined && codeVerifier!==null) {
        body.append('code_verifier', codeVerifier)
    }
    postOAuth(tokenUrlSuffix, oauth2Headers, body)
}

/**
 * 
 * @param {*} clientId - id of Application Client registered in Cognito Userpool
 * @param {*} refreshToken - refresh_token to be refresh acced and it_token pair.
 * 
 * @returns {object} { 
                        "access_token":"eyJra1example", 
                        "id_token":"eyJra2example",
                        "token_type":"Bearer", 
                        "expires_in":3600
                        }
 */
export const refreshToken = async (clientId, refreshToken) => {
    const body = {}
    body.append('grant_type','refresh_token')
    body.append('client_id', clientId)
    body.append('refresh_token', refreshToken)
    
    postOAuth(tokenUrlSuffix, oauth2Headers, body)
}

export const revokeToken = async () => {
    const revokeUrlSuffix = '/oauth2/revoke'
    const body = {
    }
    body.append('token', token)
    body.append('client_id', clientId)

    postOAuth(revokeUrlSuffix,oauth2Headers,body)
}

/**
 * Get user info.
 * @param {string} accessToken 
 * 
 * @returns {object} {
            "sub": "userId",
            "email": "bob@example.com",
}
 */
export const getUserInfo = async (accessToken) => {
    const headers = {}
    headers.append('Content-Type', 'application/x-amz-json-1.1')
    headers.append('Authorization', `Bearer ${token}`)

    postOAuth(infoUrlSuffix, headers)
}


/**
 * extract Autorization Code from callback uri
 * @param {string} responseUrl 
 * @returns {string} - Authorization Code that is intended to be exchanged to access-, refresh, and id-tokens 
 */
export const extractCode = responseUrl => {
    // TODO: Write extracter
    return "NOT IMPLEMENTED YET"
}

export const getChallengePKCE = () => {
    // TODO: Implement
    return "get Challenge NOT IMPLEMENTED YET"
}

export const getState = () => {
    // TODO: Implement
    return "getState NOT IMPLEMENTED YET"
}