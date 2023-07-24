import { Link } from "react-router-dom";
import { Profile } from "./Profile";
import { useAuthContext } from "../context/AuthContext";

export const Nav = () => {
  const { isAuthenticated } = useAuthContext();
  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between">
        <Link to="/">Home</Link>
        <Link to={`/blocks/${userName}`}>Blocks</Link>
        <Link to={`/channels/${userName}`}>Channels</Link>
        <Profile />
      </div>
    </>
  );
};
