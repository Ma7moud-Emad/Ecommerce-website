import { useNavigate } from "react-router-dom";
import notFound from "../../assets/images/notFound.png";
import NotFound from "./Notfoun.module.css";

function Notfound() {
  const backLeft = useNavigate();
  return (
    <div className="position-relative">
      <button
        className={
          "btn btn-success text-white position-absolute " + NotFound.handle
        }
        onClick={() => {
          backLeft("/");
        }}
      >
        &lt;
      </button>
      <img className="w-100 vh-100" src={notFound} />
    </div>
  );
}

export default Notfound;
