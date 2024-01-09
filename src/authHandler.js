import { postOAuth } from './client'
const domain = import.meta.env.VITE_JS30_FULL_DOMAIN
const clientId = import.meta.env.VITE_JS30_IDP_CLIENT_ID
const cognitoHost = import.meta.env.VITE_JS30_AUTHORIZER_URL
const redirectUri = domain === 'local' ? 'http://localhost:5173' : domain.startsWith('dev') ? `http://${domain}` : `https://${domain}`
const tokenUrlSuffix = '/oauth2/token'
const infoUrlSuffix = '/oauth2/userInfo'
const oauth2Headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
const codeChallengeMethod = 'S256'
const OAUTH_STATE_KEY = 'react-use-oauth2-state-key';

// TODO: Wrap everything in TryCatch

/**
 * 
 * @param {string} IdentityProvider - name of Identity Provider such as Google, Facebook etc
 * @param {string} scope - Can be a combination of any system-reserved scopes or custom scopes that are associated with a client. Scopes must be separated by spaces.
 * @param {string} state - Additional computed value to guard against CSRF attacks.
 * @param {string} codeChallenge - The challenge that you generated from the code_verifier. Use for PKCE
 * 
 * @see https://datatracker.ietf.org/doc/html/rfc7636
 * 
 * @returns {string} an Url
 */
export const getOIDCUrl = (
    IdentityProvider,
    scope,
    state,
    codeChallenge) => {

const authorizeUrlSuffix =  '/oauth2/authorize'
const params = []

params.push(`identity_provider=${IdentityProvider}`)
params.push("response_type=code")
params.push(`client_id=${clientId}`)
params.push(`redirect_uri=${redirectUri}`)
params.push(`scope=${scope}`)

if (state !== undefined && state!== null) {
    params.push(`state=${state}`)
}
if (codeChallenge !== undefined && codeChallenge !== null) {
        params.push(`code_challenge_method=${codeChallengeMethod}`)  
        params.push(`code_challenge=${codeChallenge}`)
    }

    return `${cognitoHost}${authorizeUrlSuffix}?${params.join('&')}`
}
/**
 * 
 * @param {string} authorizationCode - code of grant_type to be exchanged to Authorization Token
 * @param {string} codeVerifier - The proof key. Required if the authorization code was requested with PKCE.
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
    authorizationCode,
    codeVerifier) => {
    const body = {}
    body.grant_type  ='authorization_code'
    body.client_id = clientId
    body.code = authorizationCode
    body.redirect_uri = redirectUri

    if(codeVerifier!==undefined && codeVerifier!==null) {
        body.code_verifier = codeVerifier
    }

    try {
        const authData = await postOAuth(tokenUrlSuffix, oauth2Headers, body)
        if (authData !== undefined && authData !== null) {
          return authData
        }
      } catch (error) {
        console.error(
          "Ошибка во время запроса:",
          error.response || error.message || error
        );
        errorNotification(
          `Errow while requesting data`,
          `${error.message} ${error.stack}`,
          10,
          "bottomLeft"
        );
      }  
}

/**
 * 
 * @param {string} clientId - id of Application Client registered in Cognito Userpool
 * @param {string} refreshToken - refresh_token to be refresh acced and it_token pair.
 * 
 * @returns {object} { 
                        "access_token":"eyJra1example", 
                        "id_token":"eyJra2example",
                        "token_type":"Bearer", 
                        "expires_in":3600
                        }
 */
export const refreshToken = async ( refreshToken) => {
    const body = {}
    body.grant_type = 'refresh_token'
    body.client_id = clientId
    body.refresh_token = refreshToken
    
    postOAuth(tokenUrlSuffix, oauth2Headers, body)
}

export const revokeToken = async (refreshToken) => {
    const revokeUrlSuffix = '/oauth2/revoke'
    const body = {
    }
    body.token = refreshToken
    body.client_id = clientId

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
    headers[Content-Type] = "application/x-amz-json-1.1"
    headers.Authorization =  `Bearer ${accessToken}`

    postOAuth(infoUrlSuffix, headers)
}


export const getChallengePKCE = () => {
    // TODO: Implement
    return "get Challenge NOT IMPLEMENTED YET"
}

/**
 * Generate and get a state value to mitigate CSRF attacks
 * @returns {String} generated pseudo-random value
 */
export const generateState = () => {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let array = new Uint8Array(40);
	window.crypto.getRandomValues(array);
	array = array.map((x) => validChars.codePointAt(x % validChars.length));
	const randomState = String.fromCharCode.apply(null, array);
	return randomState;
}

/**
 * 
 * @param {String} generated state to be compared to 
 */

export const saveState = (state) => {
	sessionStorage.setItem(OAUTH_STATE_KEY, state);
};

export const removeState = () => {
	sessionStorage.removeItem(OAUTH_STATE_KEY);
};


/**
 * 
 * @param {String} receivedState to be checked against generated state saved previously 
 * @returns {boolean} true if recieved state equals the generated one. Else false. 
 */
export const checkState = (receivedState) => {
	const state = sessionStorage.getItem(OAUTH_STATE_KEY);
	return state === receivedState;
};