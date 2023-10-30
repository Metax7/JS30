import { FaGithub } from "react-icons/fa";
import JsLogo from "../../assets/img/JavaScript-Blog-Cover.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto py-5">
        <div className="flex max-sm:flex-col max-sm:space-y-5 items-center sm:justify-around 2xl:justify-between">
          <div>
            <Link to={""}>
              <img src={JsLogo} className="w-24" alt="" />
            </Link>
          </div>
          <div>
            <h1 className="text-center text-2xl font-bold">
              My JavaScript-<span className="text-yellow-400">30</span>{" "}
              <p>Challange</p>
            </h1>
          </div>
          <div>
            <a href="https://github.com/Metax7" target="_blank" rel="noopener noreferrer" className="text-5xl">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
