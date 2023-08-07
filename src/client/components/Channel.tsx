import { Link } from "react-router-dom";
import { Block } from "../components/Block";
import { useAuthContext } from "../context/AuthContext";
import { useGetConnections } from "../hooks/connections/useGetConnections";

import { motion } from "framer-motion";
import { fadeXY, staggerParentContainer } from "../motion";
import { Uploader } from "./Uploader";
import { tailwindStyles } from "../tailwind";

interface Props {
  id: string;
  channelTitle: string;
  isPrivate: boolean;
}

export const Channel = (props: Props) => {
  const { id, channelTitle, isPrivate } = props;

  const { data, isLoading, isError } = useGetConnections();

  const connectionsByChannel = data?.filter((connection) => {
    return connection.channelId === id;
  });

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const commonStyle = "flex flex-col w-full mb-5";
  const publicContainerStyle = `${commonStyle}`;
  const privateContainerStyle = `${commonStyle} bg-slate-300`;

  return (
    <>
      <div className={isPrivate ? privateContainerStyle : publicContainerStyle}>
        <div className="flex justify-between">
          <Link
            to={`/channels/${userName}/${channelTitle}/${id}/${isPrivate}`}
            className={`w-1/3 border-x border-t border-${tailwindStyles.highlightColour}`}
          >
            <h3>{channelTitle}</h3>
          </Link>
          {/* <p className="text-xs">{shortenUUID(id)}</p> */}
          <p className="text-xs">
            {isPrivate ? "Private Channel" : "Public Channel"}
          </p>
        </div>

        <div
          className={`flex items-center border-y border-l border-${tailwindStyles.highlightColour}`}
        >
          <div>
            <Uploader
              channelId={id}
              channelTitle={channelTitle}
              isPrivate={isPrivate}
            />
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error occurred while fetching data.</p>}
          </div>

          <motion.div
            className="flex overflow-x-scroll"
            initial="hidden"
            animate="visible"
            variants={staggerParentContainer}
          >
            {connectionsByChannel?.map((connection) => {
              return (
                <motion.div key={connection?.blockId} variants={fadeXY}>
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
