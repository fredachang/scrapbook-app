import { BlockForFeed } from "../../common/types";
import { twStyle, twText } from "../tailwind";
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
      <div className={`flex justify-between`}>
        <h4 className={`w-1/4`}>
          <div
            className={`w-full${twText.heading} border-b border-${twStyle.highlightColour} mr-${twStyle.spacing3Xl}`}
          >
            {created}
          </div>
        </h4>

        <div className={`w-3/4 ml-${twStyle.spacingXl}`}>
          <div
            className={`flex border-b border-${twStyle.highlightColour} mb-${twStyle.spacingMd}`}
          >
            <div className={twText.heading}>
              <span className={twText.headingBold}>{firstName || ""} </span>
              <span className={twText.headingBold}>{lastName || ""} </span>
              <span>connected </span>
              <span className={twText.headingBold}>{blocksCount} </span>
              <span className={twText.headingBold}>images </span>
              <span>to </span>
              <span className={twText.headingBold}>{channelTitle} </span>
            </div>
          </div>

          <div className="flex overflow-x-scroll">
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
        </div>
      </div>
    </>
  );
};
