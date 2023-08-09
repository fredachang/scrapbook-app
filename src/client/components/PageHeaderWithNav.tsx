import { Link } from "react-router-dom";
import { twStyle } from "../tailwind";
import { useAuthContext } from "../context/AuthContext";
import { Logo } from "./Logo";

interface Props {
  title: string;
  count: number;
  buttonClass?: string;
  handleShowSettings: () => void;
  handleConfirmDelete: () => void;
}

export const PageHeaderWithNav = (props: Props) => {
  const { title, count, buttonClass, handleShowSettings, handleConfirmDelete } =
    props;

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  return (
    <>
      <div
        className={`bg-${twStyle.primaryColour} w-97% h-${twStyle.sizeMd} fixed top-0 z-20 ${twStyle.primaryColour} px-${twStyle.spacingSm}`}
      >
        <div className="flex justify-between">
          <div className="flex items-center w-2/3">
            <Link to={`/`}>
              <Logo />
            </Link>

            <h1 className="mx-2">/</h1>

            <Link to={`/`}>
              <h1>{userName}</h1>
            </Link>

            <h1 className="mx-2">/</h1>

            <Link to={`/channels/${userName}`}>
              <h1>Channels</h1>
            </Link>

            <h1 className="mx-2">/</h1>

            <h1>{title}</h1>
          </div>

          <div className="w-1/5 flex justify-between">
            <button className={buttonClass} onClick={handleShowSettings}>
              <p>Update</p>
            </button>
            <button className={buttonClass} onClick={handleConfirmDelete}>
              <p>Delete</p>
            </button>

            <h2 className="text-xl">{count}</h2>
          </div>
        </div>
        {/* <div className="w-full h-1.5 border-y border-black"></div> */}
      </div>
    </>
  );
};
