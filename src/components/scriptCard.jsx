import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { likeItem, dislikeItem, updateLikesByUser } from "../client";
import { infoNotification } from "./Notifications";
import LikeButton from "./likeButton";
import { motion, useAnimation, useInView } from "framer-motion";

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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5 }}
    >
      <Card className="mt-6 shadow-2xl bg-slate-300 hover:scale-95 transition-all duration-200">
        <CardHeader color="blue-gray" className="relative h-56">
          <motion.img
            ref={ref}
            variants={{
              hidden: { scale: 0, borderRadius: 700 },
              visible: { scale: 1, borderRadius: 10 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5 }}
            src={card.cardImg}
            alt="card-image"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {card.cardTitle}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between pt-0">
          <motion.div
            ref={ref}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <Link to={card.cardLink}>
              <Button>SEE MORE</Button>
            </Link>
          </motion.div>
          <motion.div
            ref={ref}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <LikeButton
              isLiked={isLiked}
              loading={loading}
              like={like}
              onClick={handleButtonClick}
            />
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
