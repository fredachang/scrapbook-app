import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBlockWithText } from "../hooks/blocks/useCreateBlockWithText";

interface Props {
  channelId: string;
  commonFormStyle: string;
  targetUrl: string;
}

export const TextUploader = (props: Props) => {
  const { channelId, commonFormStyle, targetUrl } = props;
  const [text, setText] = useState("");

  const navigate = useNavigate();
  const createBlockMutation = useCreateBlockWithText();

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(text);

    const blockVariables = {
      text: text,
      channelId,
    };

    createBlockMutation.mutateAsync(blockVariables).then(() => {
      navigate(targetUrl, { replace: true });
      setText("");
    });
  };

  return (
    <>
      <form className={commonFormStyle} onSubmit={handleTextSubmit}>
        <div className="w-44 h-46 flex flex-col absolute">
          <input
            className="w-44 h-32"
            type="text"
            placeholder="Start Typing..."
            onChange={handleText}
            value={text}
          />
          <button type="submit">Add Text</button>
        </div>
      </form>
    </>
  );
};
