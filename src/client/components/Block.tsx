import { useState } from "react";
import { GenericButton } from "./GenericButton";
import { ConnectionModal } from "./ConnectionModal";
import { BlockActionsModal } from "./BlockActionsModal";
import { useGetConnectionId } from "../hooks/blocks/useGetConnectionId";
import { shortenUUID } from "../utils";
import { BlockExpanded } from "./BlockExpanded";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  blockId: string;
  channelId: string;
  isPrivate: boolean;
  channelTitle: string;
  imagePath: string | null;
  imageData: string | null;
}

export const Block = (props: Props) => {
  const { blockId, imagePath, imageData, channelId, channelTitle, isPrivate } =
    props;
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [expandBlock, setExpandBlock] = useState(false);

  const { data: connectionId } = useGetConnectionId({ blockId, channelId });
  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const navigate = useNavigate();

  function convertBase64ToUrl(base64string: any) {
    const imageFormat = "jpeg";
    const dataURL = `data:image/${imageFormat};base64,${base64string}`;
    return dataURL;
  }

  const imageSrc = imagePath ? imagePath : convertBase64ToUrl(imageData || "");

  const handleOnMouseOver = () => {
    setShowConnectButton(true);
  };

  const handleOnMouseLeave = () => {
    setShowConnectButton(false);
  };

  const handleClickConnect = () => {
    setShowConnectModal(true);
  };

  const handleCloseConnect = () => {
    setShowConnectModal(false);
  };

  const handleExpandBlock = () => {
    setExpandBlock(true);
  };

  const handleCloseBlock = () => {
    setExpandBlock(false);
    navigate(`/channels/${userName}`, { replace: true });
  };

  const blockContainer =
    "w-56 h-56 border m-3 border-black flex flex-col relative";
  const popUpMenuContainer = "bg-purple-100 flex justify-end z-10";

  const connectModalContainer = "w-full h-full absolute z-20";
  const imageContainer =
    "bg-yellow-100 w-full h-full flex flex-col items-center";

  // console.log(imageSrc);
  return (
    <>
      <div
        key={blockId}
        className={blockContainer}
        onMouseEnter={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <div className={popUpMenuContainer}>
          <BlockActionsModal
            blockId={blockId}
            isPrivate={isPrivate}
            channelTitle={channelTitle}
            channelId={channelId}
            connectionId={connectionId || ""}
          />
        </div>

        {showConnectModal && (
          <div className={connectModalContainer}>
            <ConnectionModal
              handleCloseConnect={handleCloseConnect}
              blockId={blockId}
              channelTitle={channelTitle}
            />
          </div>
        )}

        {showConnectButton && (
          <div className="flex">
            <GenericButton
              buttonText="Connect"
              handleOnClick={handleClickConnect}
            />
          </div>
        )}

        <div className={imageContainer}>
          <img
            src={imageSrc}
            alt="block-image"
            className="w-full h-4/5 object-contain"
            onClick={handleExpandBlock}
          />
          <p className="text-xs">ConnectionId: {shortenUUID(connectionId)}</p>
          <p className="text-xs">BlockId: {shortenUUID(blockId)}</p>
        </div>
      </div>

      {expandBlock && (
        <BlockExpanded
          imageSrc={imageSrc}
          handleCloseBlock={handleCloseBlock}
          blockId={blockId}
        />
      )}
    </>
  );
};
