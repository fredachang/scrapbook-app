import { useState } from "react";
import { GenericButton } from "./GenericButton";
import { ConnectionModal } from "./ConnectionModal";
import { useGetBlockChannels } from "../hooks/blocks/useGetBlockChannels";

interface Props {
  blockId: string;
  imagePath: string | null;
  imageData: string | null;
}

export const Block2 = (props: Props) => {
  const { blockId, imagePath, imageData } = props;
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const { data: channels, isLoading, isError } = useGetBlockChannels(blockId);

  function shortenUUID(id: string | undefined) {
    if (id) {
      return id.split("-")[0];
    }
    return "";
  }

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
    </>
  );
};
