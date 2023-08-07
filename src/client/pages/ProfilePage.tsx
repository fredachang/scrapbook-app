import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { useAuthContext } from "../context/AuthContext";

export const ProfilePage = () => {
  const { logout, profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;
  return (
    <>
      <PageHeader title={userName} count={0} buttonContainerClass="hidden" />
      <Link to="/login" onClick={logout}>
        <button>Log Out</button>
      </Link>
    </>
  );
};
