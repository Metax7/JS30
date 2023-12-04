import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { likeItem, dislikeItem, updateLikesByUser } from "../client";
import { infoNotification } from "./Notifications";
import LikeButton from "./likeButton";

export default function ScriptCard({
  card,
  userId,
  userLikes,
  likeCounter,
  headers,
  likeHandler,
  dislikeHandler,
  isAuthorized,
}) {
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUpLikes(card.id, likeCounter, userLikes);
  }, []);

  const setUpLikes = (cardId, likeCounter, userLikes) => {
    setLoading(true);
    try {


      const userLikesArray = Array.from(userLikes);
      setLike(likeCounter);


      if (
        userLikesArray !== undefined &&
        userLikesArray.includes(cardId.toString())
      ) {
        setIsLiked(true);
      }
    } catch (error) {
      console.error(
        "Ошибка во время запроса:",
        error.response || error.message || error
      );
    } finally {
      setLoading(false);
    }
  };

  const likeButtonClick = async (itemId) => {
    if (!isAuthorized)
      return infoNotification(
        "To like or dislike you need to be authenticated",
        null,
        4
      );
    setLoading(true);
    if (!isLiked) {
      try {
        const response = await likeItem(itemId, headers);
        likeHandler(itemId);
        const responseOfUpdate = await updateLikesByUser(
          userId,
          Array.from(userLikes),
          headers
        );
        setLike((prev) => prev + 1);
      } catch (error) {
        console.error(
          "Не удалось поставить лайк. Статус:",
          error.response || error.message || error
        );
        dislikeHandler(itemId);
      } finally {
        setLoading(false);
      }
      console.log("Лайк успешно поставлен!");
    } else {
      try {
        const response = await dislikeItem(itemId, headers);
        dislikeHandler(itemId);
        const responseOfUpdate = await updateLikesByUser(
          userId,
          Array.from(userLikes),
          headers
        );
        setLike((prev) => prev - 1);
      } catch (error) {
        console.error(
          "Не удалось поставить дизлайк. Статус:",
          error.response || error.message || error
        );
        likeHandler(itemId);
      } finally {
        setLoading(false);
      }
      console.log("Дизлайк успешно поставлен!");
    }

    setIsLiked(!isLiked);
  };

  const handleButtonClick = (e) => {
    if (loading) {
      e.stopPropagation();
    } else {
      likeButtonClick(card.id);
    }
  };

  return (
    <Card className="mt-6 shadow-2xl bg-slate-300 hover:scale-95 transition-all duration-200">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={card.cardImg} alt="card-image" className="w-full h-full" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {card.cardTitle}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between pt-0">
        <Link to={card.cardLink}>
          <Button>SEE MORE</Button>
        </Link>
        <div>
          <LikeButton
            isLiked={isLiked}
            loading={loading}
            like={like}
            onClick={handleButtonClick}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
