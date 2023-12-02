import { cards } from "../../../assets/data/CardsData";
import ScriptCard from "../../../components/scriptCard";
import { fetchAllItemsAndLikes, fetchLikesByUser } from "../../../client";
import { errorNotification } from "../../../components/Notifications";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_JS30_AUTH_TOKEN;
const authHeader = import.meta.env.VITE_JS30_AUTH_HEADER;
const headers = {
    "Content-Type": "application/json",
    [authHeader]: apiKey
  };
const userId = "someUserId1";

export default function Home() {
  const [items, setItems] = useState(null)
  const [userLikes, setUserLikes] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(true) // to refactor later
  
  const likeHandler = itemId => {
    console.log(`likeHandler, userlikes ${userLikes}, itemId ${itemId.toString()}`)
    setUserLikes(userLikes.add(itemId.toString()))
  };
  const dislikeHandler = itemId => {
    setUserLikes(userLikes.delete(itemId.toString()))
  };



  useEffect( () => {
   let active = true;
const fetchAll = async () => {
  try {
    const response = await fetchAllItemsAndLikes();
    console.log(response)
    if (active && response !== undefined && response.data !== undefined && response.data.Items !== undefined) {
      console.log(Array.from(response.data.Items))
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
    fetchAll();
    if(isAuthorized){
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
                error.response || error.message || error);
                errorNotification(`Errow while requesting data`, `${error.message} ${error.stack}`,10, 'bottomLeft')
              }}
      fetchUserLikes()
    }
    return () => {
      active = true;
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
            items = {items} 
            headers = {headers} 
            likeHandler={likeHandler} 
            dislikeHandler={dislikeHandler}
            isAuthorized={isAuthorized}  />;
          })}
      </div>
    </div>
  );
}
