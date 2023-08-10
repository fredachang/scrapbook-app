import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ImageUploader } from "./ImageUploader";
import { TextUploader } from "./TextUploader";
import { buttonStyleHalf, twStyle } from "../tailwind";

interface Props {
  channelId: string;
  channelTitle: string;
  isPrivate: boolean;
}

const mode = {
  image: "image",
  text: "text",
};

export const Uploader = (props: Props) => {
  const { channelId, channelTitle, isPrivate } = props;
  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const [inputMode, setInputMode] = useState(mode.image);

  const location = useLocation();

  const currentPath = location.pathname;
  let targetUrl: string;

  switch (currentPath) {
    case `/channels/${userName}`:
      targetUrl = `/channels/${userName}`;
      break;
    case `/channels/${userName}/${channelTitle}/${channelId}/${isPrivate}`:
      targetUrl = `/channels/${userName}/${channelTitle}/${channelId}/${isPrivate}`;
      break;
    default:
      targetUrl = `/channels/${userName}/${channelTitle}/${channelId}/${isPrivate}`;
  }

  const handleImageMode = () => {
    setInputMode(mode.image);
  };

  const handleTextMode = () => {
    setInputMode(mode.text);
  };

  const commonFormStyle =
    "w-full h-full flex relative justify-center items-center";

  return (
    <>
      <div
        className={`flex flex-col border border-${twStyle.highlightColour} ${twStyle.blockDimensions} mr-${twStyle.spacingLg}`}
      >
        <div className={`flex h-${twStyle.sizeSm} justify-between`}>
          <button onClick={handleImageMode} className={buttonStyleHalf}>
            <p>Image</p>
          </button>
          <button onClick={handleTextMode} className={buttonStyleHalf}>
            <p>Text</p>
          </button>
        </div>

        <div className="w-full h-full">
          {inputMode === mode.image ? (
            <ImageUploader
              channelId={channelId}
              targetUrl={targetUrl}
              commonFormStyle={commonFormStyle}
            />
          ) : (
            <TextUploader
              channelId={channelId}
              targetUrl={targetUrl}
              commonFormStyle={commonFormStyle}
            />
          )}
        </div>
      </div>
    </>
  );
};
