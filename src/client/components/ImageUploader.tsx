import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCreateBlockByUpload } from "../hooks/useCreateBlockByUpload";
import { useCreateBlock } from "../hooks/useCreateBlock";

interface Props {
  channelId: string;
}

export const ImageUploader = (props: Props) => {
  const { channelId } = props;
  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const [dragActive, setDragActive] = useState(false);
  const [imagePath, setImagePath] = useState("");

  const createBlockMutation = useCreateBlock();
  const uploadblockMutation = useCreateBlockByUpload();
  const navigate = useNavigate();

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

      console.log(imageFile);

      const reader = new FileReader();

      reader.readAsDataURL(imageFile);

      reader.onload = function () {
        const base64Url = reader.result;
        const blockVariables = {
          image_data: base64Url,
          channelId,
        };

        uploadblockMutation.mutateAsync(blockVariables).then(() => {
          navigate(`/channels/${userName}`, { replace: true });
        });
      };
    }
  };

  const handleManualUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
    }
  };

  const handleImagePath = (e: ChangeEvent<HTMLInputElement>) => {
    setImagePath(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const blockVariables = {
      image_path: imagePath,
      channelId,
    };

    createBlockMutation.mutateAsync(blockVariables).then(() => {
      navigate(`/channels/${userName}`, { replace: true });
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
