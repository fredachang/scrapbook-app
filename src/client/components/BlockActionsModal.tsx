import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useDeleteConnection } from "../hooks/connections/useDeleteConnection";

interface Props {
  blockId: string;
  connectionId: string;
  channelTitle: string;
  channelId: string;
  isPrivate: boolean;
}

export const BlockActionsModal = (props: Props) => {
  const { blockId, connectionId, channelTitle, channelId, isPrivate } = props;

  const [menuPopUp, setMenuPopUp] = useState(false);

  const { profile } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const deleteConnectionMutation = useDeleteConnection();

  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const handleMouseOver = () => {
    setMenuPopUp(true);
  };

  const handleMouseLeave = () => {
    setMenuPopUp(false);
  };

  const handleRemoveConnection = () => {
    const currentPath = location.pathname;

    // console.log(channelTitle);

    let targetUrl: string;

    switch (currentPath) {
      case `/channels/${userName}`:
        targetUrl = `/channels/${userName}`;
        break;
      case `/channels/${userName}/${channelTitle}/${channelId}/${isPrivate}`:
        targetUrl = `/channels/${userName}/${channelTitle}/${channelId}//${isPrivate}`;
        break;
    }

    const variables = {
      connectionId: connectionId,
      blockId: blockId,
    };

    deleteConnectionMutation.mutateAsync(variables).then(() => {
      navigate(targetUrl, { replace: true });
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
