import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export default function ScriptCard(props) {
  ScriptCard.propTypes = {
    cardTitle: PropTypes.string.isRequired,
    cardLink: PropTypes.string.isRequired,
    cardImg: PropTypes.string.isRequired,
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
      <CardFooter className="pt-0">
        <Link to={props.cardLink}>
          <Button>SEE MORE</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
