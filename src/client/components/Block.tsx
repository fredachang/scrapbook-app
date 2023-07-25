import { useState } from "react";
import { GenericButton } from "./GenericButton";
import { PopUpMenu } from "./PopUpMenu";
import { ConnectionModal } from "./ConnectionModal";

interface Props {
  id: string;
  imagePath: string | null;
  imageData: string | null;
}

export const Block = (props: Props) => {
  const { id, imagePath, imageData } = props;
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  function shortenBlockId(id: string) {
    return id.split("-")[0];
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

  const handleClickConnectButton = () => {
    setShowConnectModal(true);
  };

  const handleCloseConnectButton = () => {
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
        key={id}
        className={blockContainer}
        onMouseEnter={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <div className={popUpMenuContainer}>
          <PopUpMenu blockId={id} />
        </div>

        {showConnectModal && (
          <div className={connectModalContainer}>
            <ConnectionModal
              handleCloseConnectButton={handleCloseConnectButton}
            />
          </div>
        )}

        {showConnectButton && (
          <div className=" flex">
            <GenericButton
              buttonText="Connect"
              handleOnClick={handleClickConnectButton}
            />
          </div>
        )}

        <div className={imageContainer}>
          <img
            src={imageSrc}
            alt="block-image"
            className="w-full h-4/5 object-contain"
          />
          <p className="text-xs">{shortenBlockId(id)}</p>
        </div>
      </div>
    </>
  );
};
