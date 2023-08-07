import { useAuthContext } from "../context/AuthContext";
import { tailwindStyles } from "../tailwind";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  const { isAuthenticated } = useAuthContext();
  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <div
        className={`${tailwindStyles.primaryColour} h-full flex flex-col justify-between`}
      >
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "verticalTextActive"
              : "verticalText"
          }
        >
          <h2> Home</h2>
        </NavLink>
        <NavLink
          to={`/blocks/${userName}`}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "verticalTextActive"
              : "verticalText"
          }
        >
          <h2> Blocks</h2>
        </NavLink>
        <NavLink
          to={`/channels/${userName}`}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "verticalTextActive"
              : "verticalText"
          }
        >
          <h2>Channels</h2>
        </NavLink>

        <NavLink
          to={`/${userName}`}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "verticalTextActive"
              : "verticalText"
          }
        >
          <h2>{userName}</h2>
        </NavLink>

        {/* <Profile /> */}
      </div>
    </>
  );
};
