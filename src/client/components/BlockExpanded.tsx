import { useState } from "react";
import { ConnectionModal } from "./ConnectionModal";
import { GenericButton } from "./GenericButton";
import { buttonStyleFull, twStyle } from "../tailwind";

interface Props {
  imageSrc: string;
  handleCloseBlock: () => void;
  blockId: string;
}

export const BlockExpanded = (props: Props) => {
  const { imageSrc, handleCloseBlock, blockId } = props;

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
      <div className={containerstyle} onClick={handleCloseBlock}>
        <div className={imgContainerStyle}>
          <img src={imageSrc} alt="block-image" className={imgStyleStatic} />
        </div>

        {/* <p className="text-xs">BlockId: {shortenUUID(blockId)}</p> */}

        <div
          className={`flex flex-col relative justify-between w-1/3 mr-${twStyle.spacingLg}`}
        >
          <div className="w-full">
            <GenericButton
              buttonText="Connect"
              handleOnClick={handleClickConnect}
              buttonStyle={`${buttonStyleFull} mb-${twStyle.spacingSm}`}
              buttonType="button"
            />
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
