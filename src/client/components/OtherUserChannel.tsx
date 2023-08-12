import { motion } from "framer-motion";
import {
  durationSettings,
  easeSettings,
  fade,
  staggerParentContainer,
} from "../motion";
import { TitleBlock } from "./TitleBlock";
import { blockContainerStyle, twStyle } from "../tailwind";
import { useGetOtherUserConnections } from "../hooks/feed/useGetOtherUserConnections";
import { useParams } from "react-router-dom";
import { Block2 } from "./Block2";

interface Props {
  id: string;
  channelTitle: string;
  isPrivate: boolean;
}

export const OtherUserChannel = (props: Props) => {
  const { id, channelTitle, isPrivate } = props;
  const { userId, username } = useParams();

  const userIdCheck = userId ? userId : "";

  const { data } = useGetOtherUserConnections(userIdCheck);

  const connectionsByChannel = data?.filter((connection) => {
    return connection.channelId === id;
  });

  const connectionsCheck = connectionsByChannel ? connectionsByChannel : [];

  const connectionsCount = connectionsCheck.length;

  const commonStyle = `flex items-center mb-${twStyle.spacingLg}`;
  const publicContainerStyle = `${commonStyle}`;
  const privateContainerStyle = `${commonStyle} bg-${twStyle.primaryColour}`;

  return (
    <>
      <div className={isPrivate ? privateContainerStyle : publicContainerStyle}>
        <div>
          <TitleBlock
            linkToChannel={`/channels/${username}/${channelTitle}/${id}/${isPrivate}`}
            channelTitle={channelTitle}
            isPrivate={isPrivate}
            connectionsCount={connectionsCount}
          />
        </div>

        <div className="flex items-center overflow-x-scroll">
          <motion.div
            className="flex"
            initial="hidden"
            animate="visible"
            variants={staggerParentContainer}
          >
            {connectionsByChannel?.map((connection) => {
              return (
                <motion.div
                  key={connection?.blockId}
                  variants={fade(durationSettings.fast, easeSettings.easeIn)}
                >
                  <Block2
                    blockId={connection?.blockId}
                    imagePath={connection.imagePath}
                    imageData={connection.imageData}
                    text={connection.text}
                    blockContainerStyle={`${blockContainerStyle}`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};
