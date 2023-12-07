import { getOAuth, postOAuth } from './client'

const tokenUrlSuffix = '/oauth2/token'
const infoUrlSuffix = '/oauth2/userInfo'
const oauth2Headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
const codeChallengeMethod = 'S256'

export const getOpenSamlUrl = (
    IdentityProvider,
    clientId,
    redirectUri,
    scope,
    state,
    code_challenge) => {
// https://docs.aws.amazon.com/cognito/latest/developerguide/authorization-endpoint.html
// FIXME: add STATE ,                           code_challenge_method=S256&code_challenge=CODE_CHALLENGE
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
if (codeChallengeMethod !== undefined && code_challenge !== undefined 
    && codeChallengeMethod !== null && code_challenge !== null) {
        params.append("code_challenge_method", codeChallengeMethod)
        params.append("code_challenge", code_challenge)
    }


getOAuth(authorizeUrlSuffix, params)
//     
// const ff = `${cognitoHost}/oauth2/authorize?identity_provider=${IdentityProvider}
// &response_type=CODE&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
    
}
export const xChange = async (
    clientId,
    authorization_code,
    redirectUri,
    codeVerifier) => {
    const body = {}
    body.append('grant_type','authorization_code')
    body.append('client_id', clientId)
    body.append('code', authorization_code)
    body.append('redirect_uri', redirectUri)

    if(codeVerifier!==undefined && codeVerifier!==null) {
        body.append('code_verifier', codeVerifier)
    }
    postOAuth(tokenUrlSuffix, oauth2Headers, body)
}
export const refreshToken = async (clientId, token) => {
    const body = {}
    body.append('grant_type','refresh_token')
    body.append('client_id', clientId)
    body.append('refresh_token', token)
    
    postOAuth(tokenUrlSuffix, oauth2Headers, body)
}

export const getUserInfo = async (token) => {
    const headers = {}
    headers.append('Content-Type', 'application/x-amz-json-1.1')
    headers.append('Authorization', `Bearer ${token}`)

    postOAuth(infoUrlSuffix, headers)
}

export const extractCode = responseUrl => {
    // TODO: Write extracter
    return "NOT IMPLEMENTED YET"
}

export const getChallengePKCE = () => {
    // TODO: Implement
    return "get Challenge NOT IMPLEMENTED YET"
}