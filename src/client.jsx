import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_JS30_API_GW_URL;
const apiKey = import.meta.env.VITE_JS30_AUTH_TOKEN;
const authHeader = import.meta.env.VITE_JS30_AUTH_HEADER;
const appEnv = import.meta.env.VITE_JS30_ENV;
const headers = {
    "Content-Type": "application/json",
    [authHeader]: apiKey
  };
const unauthHeaders = {
    "Content-Type": "application/json"
}
const stageUrl =  `${apiBaseUrl}/${appEnv}`
const fetchAllLikesUrl = `${stageUrl}/items`
const updateAndfetchUserLikesUrl = `${stageUrl}/userlikes`
const likeUrl = `${stageUrl}/items/like`
const dislikeUrl = `${stageUrl}/items/dislike`


const checkStatus = response => {
    if( response &&
        response.status &&
        response.status >= 200 &&
        response.status < 300) {
        return response;
    }
    const error = new Error(response.status)
    error.response = response
    return Promise.reject(error)
}

const logApiCall = (method, url, type, headers, params, body) => {
    console.log(`Method ${method} has been invoked. Url ${url} | request type ${type} | headers ${headers} | params ${params} | body ${body}`)
}

export const fetchLikesByUser = async (userId) => {

    const url = `${updateAndfetchUserLikesUrl}/${userId}`;

    logApiCall(self.name, url, "GET", headers)

    const response = await axios.get(url, { headers });
    return checkStatus (response);
  };

export const updateLikesByUser = async (userId, likedItems) => {

    const url = `${updateAndfetchUserLikesUrl}/${userId}`;
    const requestBody = {
        "userId" : userId,
        "likedItems": likedItems
      };

    logApiCall (self.name, url, "POST", headers, "", requestBody)

    const response = await axios.post(url, requestBody, {
        headers
    })
    return checkStatus (response);
}


export const likeItem = async (itemId) => {

    logApiCall(self.name, likeUrl, "POST", headers, { "itemId" : itemId } )

      const response = await axios.post(likeUrl, {
        headers,
        params: { "itemId" : itemId },
      });
      return checkStatus (response);
  };

export const dislikeItem = async (itemId) => {

    logApiCall(self.name, dislikeUrl, "POST", headers, { "itemId" : itemId } )

    const response = await axios.post(dislikeUrl, {
      headers,
      params: { "itemId" : itemId },
    });
    return checkStatus (response);
};

export const fetchAllItemsAndLikes = async () => {
    const url = `${fetchAllLikesUrl}`;

    logApiCall(self.name, url, "GET", unauthHeaders)

    const response = await axios.get(url, {unauthHeaders});
    return checkStatus (response);
}