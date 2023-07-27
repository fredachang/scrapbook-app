import { shortenUUID } from "../utils";

interface Props {
  imageSrc: string;
  handleCloseBlock: () => void;
  blockId: string;
}

export const BlockExpanded = (props: Props) => {
  const { imageSrc, handleCloseBlock, blockId } = props;
  return (
    <>
      <div className="bg-green-400 fixed top-0 right-0 w-1/3 h-full z-30">
        <button onClick={handleCloseBlock}>Close</button>
        <img
          src={imageSrc}
          alt="block-image"
          className="w-full h-4/5 object-contain"
        />
        <p className="text-xs">BlockId: {shortenUUID(blockId)}</p>
      </div>
    </>
  );
};
