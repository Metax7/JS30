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
import PropTypes from "prop-types";
import { useState } from "react";

export default function ScriptCard(props) {
  ScriptCard.propTypes = {
    cardTitle: PropTypes.string.isRequired,
    cardLink: PropTypes.string.isRequired,
    cardImg: PropTypes.string.isRequired,
  };

  const [like, setLike] = useState(100),
    [isLike, setIsLike] = useState(false),
    likeButtonClick = () => {
      setLike(like + (isLike ? -1 : 1));
      setIsLike(!isLike);
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
                ? "flex items-center border font-bold rounded-md p-2 space-x-2 border-[#111827] text-red-600"
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
