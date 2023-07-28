import { useState } from "react";
import { GenericButton } from "./GenericButton";
import { ConnectionModal } from "./ConnectionModal";
import { useGetBlockChannels } from "../hooks/blocks/useGetBlockChannels";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BlockExpanded } from "./BlockExpanded";

interface Props {
  blockId: string;
  imagePath: string | null;
  imageData: string | null;
}

function shortenUUID(id: string | undefined) {
  return id ? id.split("-")[0] : "";
}

export const Block2 = (props: Props) => {
  const { blockId, imagePath, imageData } = props;
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [expandBlock, setExpandBlock] = useState(false);

  const { data: channels } = useGetBlockChannels(blockId);
  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const navigate = useNavigate();

  function convertBase64ToUrl(base64string: string) {
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
    navigate(`/blocks/${userName}`, { replace: true });
  };

  const blockContainer =
    "w-56 h-56 border m-3 border-black flex flex-col relative";

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
        {showConnectModal && (
          <div className={connectModalContainer}>
            <ConnectionModal
              handleCloseConnect={handleCloseConnect}
              blockId={blockId}
            />
          </div>
        )}

        {showConnectButton && (
          <div className=" flex">
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
          <p className="text-xs">BlockId: {shortenUUID(blockId)}</p>
          <div>
            {channels?.map((channel) => {
              return (
                <p className="text-xs" key={channel.id}>
                  {channel.title}
                </p>
              );
            })}
          </div>
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
