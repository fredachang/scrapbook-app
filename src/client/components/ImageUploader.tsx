import { ChangeEvent, useState } from "react";
import { useCreateBlock } from "../hooks/blocks/useCreateBlock";
import { useCreateBlockByUpload } from "../hooks/blocks/useCreateBlockByUpload";
import { splitStringByComma } from "../utils";
import { useNavigate } from "react-router-dom";
import { tailwindStyles } from "../tailwind";

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

          console.log(targetUrl);

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
    ? `bg-${tailwindStyles.hoverColour} ${commonFormStyle}`
    : `bg-${tailwindStyles.primaryColour} ${commonFormStyle}`;

  const sharedDragStyle = "w-full h-full absolute z-20";
  const dragAreaStyle = dragActive
    ? `${sharedDragStyle} bg-${tailwindStyles.hoverColour}`
    : `${sharedDragStyle} bg-${tailwindStyles.primaryColour}`;

  return (
    <>
      <form
        className={formStyle}
        onDragEnter={handleDrag}
        onSubmit={handleImageSubmit}
      >
        <div className="w-full h-full flex flex-col absolute">
          <input
            className="w-full h-full"
            type="text"
            placeholder="Drag & Drop or paste path"
            onChange={handleImagePath}
            value={imagePath}
          />
          <button
            type="submit"
            className={`h-6 border-t border-${tailwindStyles.highlightColour}`}
          >
            Add Path
          </button>
        </div>

        {/* invisible element to cover the form when dragactive is true*/}
        {dragActive && (
          <div
            className={dragAreaStyle}
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
