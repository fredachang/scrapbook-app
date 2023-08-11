import { Block } from "../components/Block";
import { useAuthContext } from "../context/AuthContext";
import { useGetConnections } from "../hooks/connections/useGetConnections";

import { motion } from "framer-motion";
import {
  durationSettings,
  easeSettings,
  fade,
  staggerParentContainer,
} from "../motion";
import { TitleBlock } from "./TitleBlock";
import { twStyle } from "../tailwind";
import { Uploader } from "./Uploader";

interface Props {
  id: string;
  channelTitle: string;
  isPrivate: boolean;
}

export const Channel = (props: Props) => {
  const { id, channelTitle, isPrivate } = props;

  const { data } = useGetConnections();

  const connectionsByChannel = data?.filter((connection) => {
    return connection.channelId === id;
  });

  const connectionsCheck = connectionsByChannel ? connectionsByChannel : [];

  const connectionsCount = connectionsCheck.length;

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const commonStyle = `flex items-center mb-${twStyle.spacingLg}`;
  const publicContainerStyle = `${commonStyle}`;
  const privateContainerStyle = `${commonStyle} bg-${twStyle.primaryColour}`;

  return (
    <>
      <div className={isPrivate ? privateContainerStyle : publicContainerStyle}>
        <div>
          <TitleBlock
            linkToChannel={`/channels/${userName}/${channelTitle}/${id}/${isPrivate}`}
            channelTitle={channelTitle}
            isPrivate={isPrivate}
            connectionsCount={connectionsCount}
          />
        </div>

        {connectionsCount === 0 && (
          <Uploader
            channelId={id}
            channelTitle={channelTitle}
            isPrivate={isPrivate}
          />
        )}

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
                  <Block
                    blockId={connection?.blockId}
                    isPrivate={isPrivate}
                    channelId={id}
                    channelTitle={channelTitle}
                    imagePath={connection.imagePath}
                    imageData={connection.imageData}
                    text={connection.text}
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
