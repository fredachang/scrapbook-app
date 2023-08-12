import { useState } from "react";
import { GenericButton } from "./GenericButton";
import { ConnectionModal } from "./ConnectionModal";
import { BlockExpanded } from "./BlockExpanded";
import { buttonStyleFull, twStyle, twText } from "../tailwind";

interface Props {
  blockId: string;
  imagePath: string | null;
  imageData: string | null;
  text: string | null;
  blockContainerStyle: string;
}

export const Block2 = (props: Props) => {
  const { blockId, imagePath, imageData, text, blockContainerStyle } = props;
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [expandBlock, setExpandBlock] = useState(false);

  // const { data: blockChannels } = useGetBlockChannels(blockId);
  // const navigate = useNavigate();
  // const { profile } = useAuthContext();
  // const userName = `${profile?.firstName}-${profile?.lastName}`;

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
  };

  const connectModalContainer = "w-full h-full absolute z-20";
  const imageContainer = "w-full h-full flex flex-col items-center";

  return (
    <>
      <div className="flex flex-col">
        <div
          key={blockId}
          className={blockContainerStyle}
          onMouseEnter={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
        >
          {showConnectModal && (
            <div className={connectModalContainer}>
              <ConnectionModal
                handleCloseConnect={handleCloseConnect}
                blockId={blockId}
                channelTitle=""
              />
            </div>
          )}

          {showConnectButton && (
            <div className="flex">
              <GenericButton
                buttonText="Connect"
                handleOnClick={handleClickConnect}
                buttonStyle={`${buttonStyleFull} absolute`}
                buttonType="button"
              />
            </div>
          )}

          <div className={imageContainer}>
            {text ? (
              <div
                className={`w-full h-full border border-dotted border-${twStyle.highlightColour} py-${twStyle.spacingLg} px-${twStyle.spacingMd}`}
              >
                <p className={twText.paragraph}>{text}</p>
              </div>
            ) : (
              <img
                src={imageSrc}
                alt="block-image"
                className="w-full h-full object-contain"
                onClick={handleExpandBlock}
              />
            )}
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
