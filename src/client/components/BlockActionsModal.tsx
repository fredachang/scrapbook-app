import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useDeleteUserBlock } from "../hooks/blocks/useDeleteUserBlock";
import { useDeleteConnection } from "../hooks/connections/useDeleteConnection";

interface Props {
  blockId: string;
  connectionId: string;
}

export const BlockActionsModal = (props: Props) => {
  const { blockId, connectionId } = props;
  const [menuPopUp, setMenuPopUp] = useState(false);

  const { profile } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const deleteBlockMutation = useDeleteUserBlock();
  const deleteConnectionMutation = useDeleteConnection();

  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const handleMouseOver = () => {
    setMenuPopUp(true);
  };

  const handleMouseLeave = () => {
    setMenuPopUp(false);
  };

  //im not sure if deleteblock is needed as a functionality, in remove connection if its the only block it deletes the block already

  // const handleDeleteBlock = () => {
  //   const variables = {
  //     blockId: blockId,
  //   };

  //   deleteBlockMutation.mutateAsync(variables).then(() => {
  //     navigate(`/channels/${userName}`, { replace: true });
  //     setMenuPopUp(false);
  //   });
  // };

  const handleRemoveConnection = () => {
    const variables = {
      connectionId: connectionId,
      blockId: blockId,
    };

    deleteConnectionMutation.mutateAsync(variables).then(() => {
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
            {/* <button onClick={handleDeleteBlock}>Delete</button> */}
            {connectionId && (
              <button onClick={handleRemoveConnection}>
                Remove Connection
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
