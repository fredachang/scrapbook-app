import { useState } from "react";
import { GenericButton } from "./GenericButton";
import { ConnectionModal } from "./ConnectionModal";
import { useGetConnectionId } from "../hooks/blocks/useGetConnectionId";
import { BlockExpanded } from "./BlockExpanded";
import { useAuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  blockContainerStyle,
  buttonStyleHalf,
  twStyle,
  twText,
} from "../tailwind";
import { useDeleteConnection } from "../hooks/connections/useDeleteConnection";

interface Props {
  blockId: string;
  channelId: string;
  isPrivate: boolean;
  channelTitle: string;
  imagePath: string | null;
  imageData: string | null;
  text: string | null;
}

export const Block = (props: Props) => {
  const {
    blockId,
    imagePath,
    imageData,
    channelId,
    channelTitle,
    isPrivate,
    text,
  } = props;
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [expandBlock, setExpandBlock] = useState(false);

  const { data: connectionId } = useGetConnectionId({ blockId, channelId });

  const connectionIdCheck = connectionId ? connectionId : "";

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const navigate = useNavigate();
  const location = useLocation();
  const deleteConnectionMutation = useDeleteConnection();

  function convertBase64ToUrl(base64string: any) {
    const imageFormat = "jpeg";
    const dataURL = `data:image/${imageFormat};base64,${base64string}`;
    return dataURL;
  }

  const imageSrc = imagePath ? imagePath : convertBase64ToUrl(imageData);

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

  const handleRemoveConnection = () => {
    const currentPath = location.pathname;

    // console.log(channelTitle);

    let targetUrl: string;

    switch (currentPath) {
      case `/channels/${userName}`:
        targetUrl = `/channels/${userName}`;
        break;
      case `/channels/${userName}/${channelTitle}/${channelId}/${isPrivate}`:
        targetUrl = `/channels/${userName}/${channelTitle}/${channelId}/${isPrivate}`;
        break;
    }

    const variables = {
      connectionId: connectionIdCheck,
      blockId: blockId,
    };

    deleteConnectionMutation.mutateAsync(variables).then(() => {
      navigate(targetUrl, { replace: true });
    });
  };

  // const popUpMenuContainer = "flex justify-end z-10";

  const connectModalContainer = "w-full h-full absolute z-20";
  const imageContainer = "w-full h-full flex flex-col items-center";

  return (
    <>
      <div
        key={blockId}
        className={blockContainerStyle}
        onMouseEnter={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        {showConnectButton && (
          <div
            className={`w-full h-${twStyle.sizeSm} flex justify-between absolute`}
          >
            <GenericButton
              buttonText="Connect"
              handleOnClick={handleClickConnect}
              buttonStyle={buttonStyleHalf}
              buttonType="button"
            />
            <GenericButton
              buttonText="Remove"
              handleOnClick={handleRemoveConnection}
              buttonStyle={buttonStyleHalf}
              buttonType="button"
            />
          </div>
        )}

        {showConnectModal && (
          <div className={connectModalContainer}>
            <ConnectionModal
              handleCloseConnect={handleCloseConnect}
              blockId={blockId}
              channelTitle={channelTitle}
            />
          </div>
        )}

        <div className={imageContainer}>
          {text ? (
            <div
              className={`w-full h-full  border border-dotted border-${twStyle.highlightColour} py-${twStyle.spacingLg} px-${twStyle.spacingMd}`}
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

      {expandBlock && (
        <BlockExpanded
          imageSrc={imageSrc}
          handleCloseBlock={handleCloseBlock}
          blockId={blockId}
          connectionId={connectionIdCheck}
        />
      )}
    </>
  );
};
