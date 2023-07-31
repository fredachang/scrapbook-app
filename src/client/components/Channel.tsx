import { Link } from "react-router-dom";
import { Block } from "../components/Block";
import { ImageUploader } from "../components/ImageUploader";
import { useAuthContext } from "../context/AuthContext";
import { useGetConnections } from "../hooks/connections/useGetConnections";

import { motion } from "framer-motion";
import { fadeXY, staggerParentContainer } from "../motion";
import { shortenUUID } from "../utils";

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

  const publicContainerStyle = "bg-slate-100 flex m-4";
  const privateContainerStyle = "bg-lime-100 flex m-4";

  return (
    <>
      <div className={isPrivate ? privateContainerStyle : publicContainerStyle}>
        <div>
          <Link to={`/channels/${userName}/${channelTitle}/${id}/${isPrivate}`}>
            {channelTitle}
          </Link>
          <p className="text-xs">{shortenUUID(id)}</p>
          <p className="text-xs">
            {isPrivate ? "Private Channel" : "Public Channel"}
          </p>
        </div>

        <div>
          <ImageUploader
            channelId={id}
            channelTitle={channelTitle}
            isPrivate={isPrivate}
          />
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error occurred while fetching data.</p>}
        </div>

        <motion.div
          className="bg-red-100 flex flex-row overflow-x-hidden"
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
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};
