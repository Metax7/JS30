import axios from "axios";


const cognitoHost = import.meta.env.VITE_JS30_AUTHORIZER_URL
const apiBaseUrl = import.meta.env.VITE_JS30_API_GW_URL
const appEnv = import.meta.env.VITE_JS30_ENV
const unauthHeaders = {
    "Content-Type": "application/json"
}
const stageUrl =  `${apiBaseUrl}/${appEnv}`
const fetchAllLikesUrl = `${stageUrl}/items`
const updateAndfetchUserLikesUrl = `${stageUrl}/userlikes`
const likeUrl = `${stageUrl}/items/like`
const dislikeUrl = `${stageUrl}/items/dislike`

const checkStatus = response => {
    if(response.status === 200) {
        return response
    }
    const error = new Error(response.status)
    error.response = response
    return Promise.reject(error)
}

const logApiCall = (name, url, type, headers, params, body) => {
    console.log(`Method ${name} has been invoked. Url ${url} | request type ${type} |
    headers ${JSON.stringify(headers)} | params ${JSON.stringify(params)} | body ${JSON.stringify(body)}`)
}

export const fetchLikesByUser = async (userId, headers) => {

    const url = `${updateAndfetchUserLikesUrl}/${userId}`

    logApiCall("fetchLikesByUser", url, "GET", headers)

    const response = await axios.get(url, { headers })
    return checkStatus (response)
  };

export const updateLikesByUser = async (userId, likedItems, headers) => {

    const url = `${updateAndfetchUserLikesUrl}`
    const requestBody = {
        userId : userId,
        likedItems: likedItems
      };

    logApiCall ("updateLikesByUser", url, "POST", headers, "", requestBody)

    const response = await axios.post(
      url,
      requestBody,
      {headers}
      )
    return checkStatus (response)
}


export const likeItem = async (itemId, headers) => {

    logApiCall("likeItem", likeUrl, "POST", headers, { itemId : itemId } )

      const response = await axios.post(
        likeUrl,
        null,
        {
        headers,
        params: { itemId : itemId }
      });
      return checkStatus (response)
  };

export const dislikeItem = async (itemId, headers) => {

    logApiCall("dislikeItem", dislikeUrl, "POST", headers, {  itemId : itemId } )

    const response = await axios.post(
      dislikeUrl,
      null, {
      headers,
      params: {  itemId : itemId }
    });
    return checkStatus (response);
};

export const fetchAllItemsAndLikes = async () => {
    const url = `${fetchAllLikesUrl}`

    logApiCall("fetchAllItemsAndLikes", url, "GET", unauthHeaders)

    const response = await axios.get(url, {unauthHeaders});
    return checkStatus (response)
}

// export const getOAuth = async () => {

//   const response =  await axios.get("https://js30localdevwfi.auth.us-west-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=CODE&client_id=1rq65aa262uk8bmvbunb8fqg31&redirect_uri=http://localhost:5173&scope=aws.cognito.signin.user.admin email openid")

//   return checkStatus(response)
// }


/**
 * 
 * @param {string} urlSuffix 
 * @param {Object} params 
 * 
 * @todo - please refactor it
 * 
 * @callback GET https://mydomain.auth.us-east-1.amazoncognito.com/oauth2/authorize?
                                 response_type=code&
                                 client_id=ad398u21ijw3s9w3939&
                                 redirect_uri=https://YOUR_APP/redirect_uri&
                                 state=STATE&
                                 scope=openid+profile+aws.cognito.signin.user.admin


https://js30localdevwfi.auth.us-west-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=CODE&client_id=1rq65aa262uk8bmvbunb8fqg31&redirect_uri=http:%2F%2Flocalhost:5173&scope=aws.cognito.signin.user.admin+email+openid
 * @returns 
 */
export const getOAuth = async (urlSuffix, params) =>  {

  const url = `${cognitoHost}${urlSuffix}`

  logApiCall("getOAuth", url, "GET", null, params)
  window.location.assign("https://js30localdevwfi.auth.us-west-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=CODE&client_id=1rq65aa262uk8bmvbunb8fqg31&redirect_uri=http:%2F%2Flocalhost:5173&scope=aws.cognito.signin.user.admin+email+openid")
//   const response = await axios.get(url, {params})
// return checkStatus(response)
}

export const postOAuth = async (urlSuffix, headers, requestBody) => { 
  const url = `${cognitoHost}${urlSuffix}`
  
  logApiCall("postOAuth", url, "POST", headers, null, requestBody)

  const response = await axios.post(url, requestBody, {headers}
    )
    return checkStatus(response)
  
}