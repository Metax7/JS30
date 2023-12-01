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
  const [items, setItems] = useState([])
  const [userLikes, setUserLikes] = useState(new Set())
  const [isAuthorized, setIsAuthorized] = useState(true) // to refactor later

  const likeHandler = itemId => {
    setUserLikes(userLikes.add(itemId.toString()))
  };
  const dislikeHandler = itemId => {
    setUserLikes(userLikes.delete(itemId.toString()))
  };
  const fetchAll = async () => {
    try {
      const response = await fetchAllItemsAndLikes();
      console.log(response)
      if (response !== undefined && response.data !== undefined && response.data.Items !== undefined) {
        console.log(response.data.Items)
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
      if (response !== undefined && response.data !== undefined) {
        console.log(new Set(response.data))
        setUserLikes(new Set(response.data))
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
  useEffect(() => {
    fetchAll();
    if(isAuthorized){
      fetchUserLikes();
    }
  }, []);
      
  return (
    <div className="max-w-screen-xl mx-auto mt-20 px-7 md:px-12 lg:px-7 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards &&
          cards.map((card) => {
            return <ScriptCard key={card.id} 
            card = {card} 
            userId = {userId} 
            userLikes = {userLikes}
            items = {items} 
            headers = {headers} 
            likeHandler={likeHandler} 
            dislikeHandler={dislikeHandler}  />;
          })}
      </div>
    </div>
  );
}
