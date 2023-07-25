import { useState } from "react";
import { useDeleteUserBlock } from "../hooks/useDeleteUserBlock";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface Props {
  blockId: string;
}

export const PopUpMenu = (props: Props) => {
  const { blockId } = props;
  const [menuPopUp, setMenuPopUp] = useState(false);

  const { profile } = useAuthContext();
  const navigate = useNavigate();
  const deleteMutation = useDeleteUserBlock();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const handleMouseOver = () => {
    setMenuPopUp(true);
  };

  const handleMouseLeave = () => {
    setMenuPopUp(false);
  };

  const handleDeleteBlock = () => {
    const variables = {
      blockId: blockId,
    };

    deleteMutation.mutateAsync(variables).then(() => {
      navigate(`/channels/${userName}`, { replace: true });
      setMenuPopUp(false);
    });
  };

  return (
    <>
      <div className="flex relative">
        <div
          className="w-4 h-4 bg-gray-950"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        ></div>

        {menuPopUp && (
          <div
            className="w-20 h-32 bg-slate-100 absolute top-0 right-0 z-20"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <button onClick={handleDeleteBlock}>Delete</button>
          </div>
        )}
      </div>
    </>
  );
};
