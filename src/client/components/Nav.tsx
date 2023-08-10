import { useAuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { twStyle } from "../tailwind";
import { NavTab } from "./NavTabSecond";

export const Nav = () => {
  const { isAuthenticated, logout, profile } = useAuthContext();

  const userName = `${profile?.firstName}-${profile?.lastName}`;

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <div
        className={`${twStyle.primaryColour} h-full flex flex-col justify-between`}
      >
        <NavTab path="/" linkTitle={userName} />
        <NavTab path={`/blocks/${userName}`} linkTitle="Blocks" />
        <NavTab path={`/channels/${userName}`} linkTitle="Channels" />
        <NavTab path={`/login`} handleOnClick={logout} linkTitle="Log Out" />
      </div>
    </>
  );
};
