import { useAuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { twStyle } from "../tailwind";

export const Nav = () => {
  const { isAuthenticated } = useAuthContext();
  const { logout, profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <div
        className={`${twStyle.primaryColour} h-full flex flex-col justify-between`}
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
          <h2> {userName}</h2>
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
          to="/login"
          onClick={logout}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "verticalTextActive"
              : "verticalText"
          }
        >
          <h2>Log Out</h2>
        </NavLink>
      </div>
    </>
  );
};
