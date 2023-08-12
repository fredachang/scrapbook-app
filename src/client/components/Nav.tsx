import { useAuthContext } from "../context/AuthContext";
import { NavTab } from "./NavTabSecond";

export const Nav = () => {
  const { isAuthenticated, profile } = useAuthContext();

  const userName = `${profile?.firstName}-${profile?.lastName}`;

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <div className={`h-full flex flex-col justify-between`}>
        <NavTab path="/" linkTitle="Feed" />
        <NavTab path={`/blocks/${userName}`} linkTitle="Blocks" />
        <NavTab path={`/channels/${userName}`} linkTitle="Channels" />
        <NavTab path={`/${userName}`} linkTitle={userName} />
      </div>
    </>
  );
};
