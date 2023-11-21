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
import { useState } from "react";
import axios from "axios";

export default function ScriptCard(props) {
  const [like, setLike] = useState(0);
  const [isLike, setIsLike] = useState(false);

  const userName = "Jack Sparrow";

  const likeButtonClick = async () => {
    const apiBaseUrl = import.meta.env.VITE_JS30_API_GW_URL;
    const apiKey = import.meta.env.VITE_JS30_AUTH_TOKEN;
    const authHeader = import.meta.env.VITE_JS30_AUTH_HEADER;

    const apiUrl = `${apiBaseUrl}/items/like`;

    const headers = {
      "Content-Type": "application/json",
      [authHeader]: apiKey,
    };

    const requestBody = {
      username: userName,
    };

    try {
      const response = await axios.post(apiUrl, requestBody, { headers });

      if (response.status === 200) {
        console.log("Лайк успешно поставлен!");

        setLike(like + (isLike ? -1 : 1));

        setIsLike(!isLike);
      } else {
        console.error("Не удалось поставить лайк. Статус:", response.status);
      }
    } catch (error) {
      console.error("Ошибка во время запроса:", error);
    }
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
              (isLike
                ? "flex items-center border font-bold rounded-md p-2 space-x-2 border-[#111827] text-blue-600"
                : "flex items-center border font-bold rounded-md p-2 space-x-2 border-[#111827]")
            }
            onClick={likeButtonClick}
          >
            <BiSolidLike /> <span>{like}</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
