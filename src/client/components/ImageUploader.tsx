import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCreateBlock } from "../hooks/blocks/useCreateBlock";
import { useCreateBlockByUpload } from "../hooks/blocks/useCreateBlockByUpload";
import { splitStringByComma } from "../utils";

interface Props {
  channelId: string;
  channelTitle: string;
  isPrivate: boolean;
}

export const ImageUploader = (props: Props) => {
  const { channelId, channelTitle, isPrivate } = props;
  // console.log({ channelId });
  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const [dragActive, setDragActive] = useState(false);
  const [imagePath, setImagePath] = useState("");

  const createBlockMutation = useCreateBlock();
  const uploadblockMutation = useCreateBlockByUpload();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const currentPath = location.pathname;
  let targetUrl: string;

  switch (currentPath) {
    case `/channels/${userName}`:
      targetUrl = `/channels/${userName}`;
      break;
    case `/channels/${userName}/${channelTitle}/${channelId}/${isPrivate}`:
      targetUrl = `/channels/${userName}/${channelTitle}/${channelId}//${isPrivate}`;
      break;
  }

  const handleDrop = function (e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const imageFile = e.dataTransfer.files[0];

      const reader = new FileReader();

      reader.readAsDataURL(imageFile);

      reader.onload = function () {
        const base64url = reader.result;
        if (typeof base64url === "string") {
          const extractedBase64 = splitStringByComma(base64url);

          const blockVariables = {
            imageData: extractedBase64,
            channelId,
          };

          uploadblockMutation.mutateAsync(blockVariables).then(() => {
            navigate(targetUrl, { replace: true });
          });
        }
      };
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();

      reader.readAsDataURL(imageFile);

      reader.onload = function () {
        const base64url = reader.result;
        if (typeof base64url === "string") {
          const extractedBase64 = splitStringByComma(base64url);

          console.log({ channelId });
          const blockVariables = {
            imageData: extractedBase64,
            channelId,
          };

          uploadblockMutation.mutateAsync(blockVariables).then(() => {
            navigate(targetUrl, { replace: true });
          });
        }
      };
    }
  };

  const handleImagePath = (e: ChangeEvent<HTMLInputElement>) => {
    setImagePath(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const blockVariables = {
      imagePath: imagePath,
      channelId,
    };

    createBlockMutation.mutateAsync(blockVariables).then(() => {
      navigate(targetUrl, { replace: true });
      setImagePath("");
    });
  };

  const containerStyle = dragActive
    ? "bg-slate-200 flex justify-center w-full h-full text-center p-4"
    : "bg-slate-300 flex justify-center w-full h-full text-center p-4";

  return (
    <>
      <form
        className="w-56 h-56 border m-3 border-black flex relative justify-center items-center"
        onDragEnter={handleDrag}
        onSubmit={handleSubmit}
      >
        <div className="w-44 h-32 flex flex-col absolute">
          <input
            className="w-44 h-32"
            type="text"
            placeholder="Drag & Drop or paste path"
            onChange={handleImagePath}
            value={imagePath}
          />
          <button type="submit">Add Path</button>
        </div>

        <input
          id="input-file-upload"
          className="hidden"
          type="file"
          multiple={true}
          onChange={handleManualUpload}
        />
        <label className={containerStyle} htmlFor="input-file-upload">
          <div className="absolute bottom-0">Click To Upload</div>
        </label>

        {/* invisible element to cover the form when dragactive is true*/}
        {dragActive && (
          <div
            className="w-full h-full absolute"
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    </>
  );
};
