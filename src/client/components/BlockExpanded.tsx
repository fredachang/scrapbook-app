import { useState } from "react";
import { ConnectionModal } from "./ConnectionModal";
import { GenericButton } from "./GenericButton";
import { buttonStyleFull, twStyle, twText } from "../tailwind";
import { shortenUUID } from "../utils";

interface Props {
  imageSrc: string;
  handleCloseBlock: () => void;
  blockId: string;
  connectionId: string;
}

export const BlockExpanded = (props: Props) => {
  const { imageSrc, handleCloseBlock, blockId, connectionId } = props;

  const [showConnectModal, setShowConnectModal] = useState(false);

  const handleClickConnect = () => {
    setShowConnectModal(true);
  };

  const handleCloseConnect = () => {
    setShowConnectModal(false);
  };

  const containerstyle = `bg-${twStyle.primaryColour} py-${twStyle.spacingLg} fixed top-0 left-0 bottom-0 flex w-97% h-full z-30`;
  const imgContainerStyle = "w-2/3 h-full";
  const imgStyleStatic = "w-full h-full object-contain";

  return (
    <>
      <div className={containerstyle}>
        <div className={imgContainerStyle}>
          <img src={imageSrc} alt="block-image" className={imgStyleStatic} />
        </div>

        <div
          className={`flex flex-col relative justify-between w-1/3 mr-${twStyle.spacingLg}`}
        >
          <div>
            <div
              className={`${twText.small} flex justify-end mb-${twStyle.spacingMd}`}
            >
              <p className={`mr-${twStyle.spacingMd}`}>
                Block ID:{shortenUUID(blockId)}
              </p>
              <p>Connection ID:{shortenUUID(connectionId)}</p>
            </div>
            <div className="w-full">
              <GenericButton
                buttonText="Connect"
                handleOnClick={handleClickConnect}
                buttonStyle={`${buttonStyleFull} mb-${twStyle.spacingSm}`}
                buttonType="button"
              />
            </div>
          </div>

          {showConnectModal && (
            <div className="absolute w-full top-0">
              <ConnectionModal
                blockId={blockId}
                handleCloseConnect={handleCloseConnect}
                channelTitle=""
              />
            </div>
          )}

          <GenericButton
            buttonText="Close Block"
            buttonStyle={`${buttonStyleFull} mb-${twStyle.spacingSm}`}
            buttonType="button"
            handleOnClick={handleCloseBlock}
          />
        </div>
      </div>
    </>
  );
};
