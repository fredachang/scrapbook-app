import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

export const Profile = () => {
  const { logout, profile } = useAuthContext();
  const [showProfile, setShowProfile] = useState(false);

  const handleShowProfile = () => {
    setShowProfile((prevValue) => !prevValue);
  };

  return (
    <>
      <div className="flex flex-col">
        <button onClick={handleShowProfile} className="verticalText">
          <h2>Profile</h2>
        </button>

        <div className="bg-red-100">
          {showProfile && (
            <>
              <p>{profile?.firstName}</p>
              <Link to="/login" onClick={logout}>
                <button>Log Out</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};
