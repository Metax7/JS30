import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { BiSolidLike } from "react-icons/bi";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { 
  likeItem,
  dislikeItem,
  updateLikesByUser 
} from "../client"
import { errorNotification } from "./Notifications";
import axios from "axios";

export default function ScriptCard(
  props,
  userId,
  userLikes, 
  items, 
  headers, 
  onLikeHandler, 
  onDislikeHandler
  ) {
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const setUpLikes = async (itemId, items, userLikes) => {
    setLoading(true);
    try {
      console.log(`setUpLikes: itemId ${itemId} | items ${items}`)
      setLike(items.find((item) => item.ItemId === itemId.toString()).Likes)
      if (userLikes.has(itemId.toString()))
      setLike((prev) => prev + 1)
      setIsLiked(true)
    }
    catch (error) {
      console.error(
              "Ошибка во время запроса:",
              error.response || error.message || error
            );
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setUpLikes(props.id, items, userLikes);
  }, []);

  const likeButtonClick = async (itemId) => {
    setLoading(true);
    if (!isLiked){
      try {
        const response = await likeItem(itemId, headers)
        onLikeHandler(itemId)
        const responseOfUpdate = await updateLikesByUser(userId, userLikes, headers)
        setLike((prev) => prev + 1)
      }  catch (error) {
        console.error(
          "Не удалось поставить лайк. Статус:",
          error.response || error.message || error
        );
        onDislikeHandler(itemId)
      } finally {
        setLoading(false);
      } 
        console.log("Лайк успешно поставлен!");
    }
    else {
      try {
        const response = await dislikeItem(itemId, headers)
        onDislikeHandler(itemId)
        const responseOfUpdate = await updateLikesByUser(userId, userLikes, headers)
        setLike((prev) => prev - 1)

      }  catch (error) {
        console.error(
          "Не удалось поставить дизлайк. Статус:",
          error.response || error.message || error
        );
        onLikeHandler(itemId)
      } finally {
        setLoading(false);
      } 
        console.log("Лайк успешно поставлен!");

    }
    setIsLiked(!isLiked);
  };


  return (
    <Card className="mt-6 shadow-2xl bg-slate-300 hover:scale-95 transition-all duration-200">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={props.cardImg} alt="card-image" className="w-full h-full" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.cardTitle}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between pt-0">
        <Link to={props.cardLink}>
          <Button>SEE MORE</Button>
        </Link>
        <div>
          <button
            className={
              "" +
              (isLiked
                ? "flex items-center border font-bold rounded-md p-2 space-x-2 border-[#111827] text-blue-600"
                : "flex items-center border font-bold rounded-md p-2 space-x-2 border-[#111827]")
            }
            onClick={()=>likeButtonClick(props.id)}
          >
            <BiSolidLike />
            {loading ? (
              <PuffLoader color="#111827" loading={loading} size={16} />
            ) : (
              <span>{like}</span>
            )}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
