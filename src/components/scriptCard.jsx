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
import axios from "axios";

export default function ScriptCard(props) {
  const [like, setLike] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const userName = "someUserId1";



  const fetchLikes = async () => {
    setLoading(true);

    const apiBaseUrl = import.meta.env.VITE_JS30_API_GW_URL;
    const apiKey = import.meta.env.VITE_JS30_AUTH_TOKEN;
    const authHeader = import.meta.env.VITE_JS30_AUTH_HEADER;
    const appEnv = import.meta.env.VITE_JS30_ENV;
    const apiUrl = `${apiBaseUrl}/${appEnv}/userlikes/${userName}`;

    console.log(`fetchLikes: apiBaseUrl ${apiBaseUrl}, apiKey ${apiKey}, authHeader ${authHeader}, appEnv ${appEnv}`)

    const headers = {
      "Content-Type": "application/json",
      [authHeader]: apiKey
    };

    try {
      const response = await axios.get(apiUrl, { headers });

      if (response && response.data !== undefined) {
        setLike(response.data);
      } else {
        console.error("Некорректный ответ сервера:", response);
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

  useEffect(() => {
    fetchLikes();
  }, []);

  const likeButtonClick = async () => {
    setLoading(true);

    const apiBaseUrl = import.meta.env.VITE_JS30_API_GW_URL;
    const apiKey = import.meta.env.VITE_JS30_AUTH_TOKEN;
    const authHeader = import.meta.env.VITE_JS30_AUTH_HEADER;
    const appEnv = import.meta.env.VITE_JS30_ENV;

    console.log(`likeButtonClick: apiBaseUrl ${apiBaseUrl}, apiKey ${apiKey}, authHeader ${authHeader}, appEnv ${appEnv}`)

    const apiUrl = `${apiBaseUrl}/${appEnv}/items/like`;

    const headers = {
      "Content-Type": "application/json",
      [authHeader]: apiKey,
    };

    const requestBody = {
      username: userName,
    };

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers,
        params: { ItemId: props.id.toString() },
      });

      if (
        response &&
        response.status &&
        response.status >= 200 &&
        response.status < 300
      ) {
        console.log("Лайк успешно поставлен!");
        setLike((prevLike) => prevLike + (isLike ? -1 : 1));
        setIsLike(!isLike);
      } else {
        console.error(
          "Не удалось поставить лайк. Статус:",
          response && response.status
        );
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
