import { motion } from "framer-motion";
import { BlockForFeed } from "../../common/types";
import { blockContainerStyle, twStyle, twText } from "../tailwind";
import { Block2 } from "./Block2";
import { durationSettings, easeSettings, fade } from "../motion";
import { useNavigate } from "react-router-dom";

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
  const { created, firstName, lastName, channelTitle, blocks, userId } = props;
  const blocksCount = blocks.length;
  const navigate = useNavigate();

  const userName = `${firstName}-${lastName}`;

  const handleClickOtherUser = () => {
    navigate(`/${userName}/${userId}/blocks`, { replace: true });
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fade(durationSettings.medium, easeSettings.easeInOut)}
        className={`flex justify-between rounded-md pt-6 mb-4 ${twStyle.textColour}`}
      >
        <h4 className={`w-2/6`}>
          <div
            className={`w-full${twText.subheading} mr-${twStyle.spacing3Xl}`}
          >
            {created}
          </div>
        </h4>

        <div className={`w-4/6`}>
          <div className={`flex mb-${twStyle.spacingMd}`}>
            <div className={twText.subheading}>
              <div
                onClick={handleClickOtherUser}
                className={`inline cursor-pointer ${twText.subheadingBold}`}
              >
                {" "}
                {`${firstName} ${lastName} `}
              </div>

              <span>connected </span>
              <span className={twText.subheadingBold}>{blocksCount} </span>
              <span className={twText.subheadingBold}>images </span>
              <span>to </span>
              <span className={twText.subheadingBold}>{channelTitle} </span>
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
                      blockContainerStyle={`${blockContainerStyle} mb-${twStyle.spacingLg}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </motion.div>
    </>
  );
};
