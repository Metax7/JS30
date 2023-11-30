import { 
    likeItem,
    dislikeItem,
    fetchAllItemsAndLikes,
    fetchLikesByUser,
    updateLikesByUser 
} from "../client"

const apiKey = import.meta.env.VITE_JS30_AUTH_TOKEN;
const authHeader = import.meta.env.VITE_JS30_AUTH_HEADER;
const headers = {
    "Content-Type": "application/json",
    [authHeader]: apiKey
  };
  //
  // implement the features down below. Use additional parameters if required. 
export const like = async (itemId, likedItems) => {
    likeItem(itemId, headers)
    updateLikesByUser(itemId, likedItems, headers)
}

export const dislike = async (itemId, likedItems) => {
    dislikeItem(itemId, headers)
    updateLikesByUser(itemId, likedItems, headers)
}

export const fetchAll = async () => {
    fetchAllItemsAndLikes()
}

export const fetchLikes = async (userId)=> {
    fetchLikesByUser(userId, headers)
}
