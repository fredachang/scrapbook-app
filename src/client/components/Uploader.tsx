import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ImageUploader } from "./ImageUploader";
import { TextUploader } from "./TextUploader";

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
      targetUrl = "/"; // Set a default value in case the switch doesn't match any case
  }

  const handleImageMode = () => {
    setInputMode(mode.image);
  };

  const handleTextMode = () => {
    setInputMode(mode.text);
  };

  const commonFormStyle =
    "w-56 h-56 border m-3 border-black flex relative justify-center items-center";

  return (
    <>
      <div className="flex justify-between">
        <button onClick={handleImageMode}>Image</button>
        <button onClick={handleTextMode}>Text</button>
      </div>

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
    </>
  );
};
