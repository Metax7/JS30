import { cards } from "../../../assets/data/CardsData";
import ScriptCard from "../../../components/scriptCard";
import { fetchAllItemsAndLikes, fetchLikesByUser } from "../../../client";
import { errorNotification } from "../../../components/Notifications";
import { useEffect, useState } from "react";

const authToken = import.meta.env.VITE_JS30_AUTH_TOKEN;
const authHeader = import.meta.env.VITE_JS30_AUTH_HEADER;
const headers = {
    "Content-Type": "application/json",
    [authHeader]: authToken
  };
const userId = "someUserId1";

export default function Home() {
  const [items, setItems] = useState(null)
  const [userLikes, setUserLikes] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(true) // to refactor later
  
  const likeHandler = itemId => {
    userLikes.add(itemId.toString())
  };
  const dislikeHandler = itemId => {
      userLikes.delete(itemId.toString());
  };



  useEffect( () => {
   
const fetchAll = async () => {
  try {
    const response = await fetchAllItemsAndLikes();
    console.log(response)
    if (active && response !== undefined && response.data !== undefined && response.data.Items !== undefined) {
      setItems(response.data.Items)
    }
  } 
  catch (error) {
    console.error(
      "Ошибка во время запроса:",
      error.response || error.message || error
    );
    errorNotification(`Errow while requesting data`, `${error.message} ${error.stack}`,10, 'bottomLeft')
  }
}
const fetchUserLikes = async () => {
  try {
  const response = await fetchLikesByUser(userId,headers)
    if (active && response !== undefined && response.data !== undefined) {
      console.log(new Set(response.data))
      setUserLikes(new Set(response.data))
    }
      }  
      catch (error) {
        console.error(
          "Ошибка во время запроса:",
          error.response || error.message || error)
          errorNotification(`Errow while requesting data`, `${error.message} ${error.stack}`,10, 'bottomLeft')
        }
      }
    let active = true
    fetchAll()
    if(isAuthorized) {
      fetchUserLikes()
    }
    return () => {
      active = false
    }
  }, []);
      
  return (
    <div className="max-w-screen-xl mx-auto mt-20 px-7 md:px-12 lg:px-7 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards && items && userLikes &&
          cards.map((card) => {
            return <ScriptCard key={card.id} 
            card = {card} 
            userId = {userId} 
            userLikes = {userLikes}
            likeCounter = {Number(items.find((item) => item.ItemId === card.id.toString()).Likes)} 
            headers = {headers} 
            likeHandler={likeHandler} 
            dislikeHandler={dislikeHandler}
            isAuthorized={isAuthorized}  />;
          })}
      </div>
    </div>
  );
}
