import { BlockForFeed } from "../../common/types";
import { twStyle } from "../tailwind";
import { Block2 } from "./Block2";

interface Props {
  created: string;
  channelId: string;
  userId: string;
  firstName: string;
  lastName: string;
  channelTitle: string;
  blocks: BlockForFeed[];
}

export const SocialPost = (props: Props) => {
  const { created, firstName, lastName, channelTitle, blocks } = props;

  const blocksCount = blocks.length;

  return (
    <>
      <div
        className={`flex justify-between border-b border-${twStyle.highlightColour} mb-${twStyle.spacingMd} mx-${twStyle.spacingSm}`}
      >
        <div>
          <h4>
            <span className="font-bold">{firstName || ""} </span>
            <span className="font-bold">{lastName || ""} </span>
            <span>connected </span>
            <span>{blocksCount} </span>
            <span>images </span>
            <span>to </span>
            <span className="font-bold">{channelTitle} </span>
            <span>on </span>
          </h4>
        </div>

        <h4>
          <span className="font-bold">{created}</span>
        </h4>
      </div>

      <div>
        {blocks &&
          blocks.map((block) => {
            return (
              <div key={block.id}>
                <Block2
                  blockId={block.id}
                  imagePath={block.imagePath}
                  imageData={block.imageData}
                  text={block.text}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};
