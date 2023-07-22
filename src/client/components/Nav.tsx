import { Link } from "react-router-dom";
import { Profile } from "./Profile";
import { useAuthContext } from "../context/AuthContext";

export const Nav = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/blocks">
          <button>Blocks</button>
        </Link>
        <Link to="/channels">
          <button>Channels</button>
        </Link>
        <Profile />
      </div>
    </>
  );
};
