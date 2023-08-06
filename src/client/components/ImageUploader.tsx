import { ChangeEvent, useState } from "react";
import { useCreateBlock } from "../hooks/blocks/useCreateBlock";
import { useCreateBlockByUpload } from "../hooks/blocks/useCreateBlockByUpload";
import { splitStringByComma } from "../utils";
import { useNavigate } from "react-router-dom";

interface Props {
  channelId: string;
  targetUrl: string;
  commonFormStyle: string;
}

export const ImageUploader = (props: Props) => {
  const { channelId, targetUrl, commonFormStyle } = props;
  const [dragActive, setDragActive] = useState(false);
  const [imagePath, setImagePath] = useState("");

  const navigate = useNavigate();
  const createBlockMutation = useCreateBlock();
  const uploadblockMutation = useCreateBlockByUpload();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

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

  const handleImageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleImagePath = (e: ChangeEvent<HTMLInputElement>) => {
    setImagePath(e.target.value);
  };

  const formStyle = dragActive
    ? `bg-slate-200 ${commonFormStyle}`
    : `bg-slate-300 ${commonFormStyle}`;

  return (
    <>
      <form
        className={formStyle}
        onDragEnter={handleDrag}
        onSubmit={handleImageSubmit}
      >
        <div className="w-44 h-46 flex flex-col absolute">
          <input
            className="w-44 h-32"
            type="text"
            placeholder="Drag & Drop or paste path"
            onChange={handleImagePath}
            value={imagePath}
          />
          <button type="submit">Add Path</button>
        </div>

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
