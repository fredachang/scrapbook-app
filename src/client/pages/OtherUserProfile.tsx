import { NewChannelModal } from "../components/NewChannelModal";
import { PageHeader } from "../components/PageHeader";
import { Heading } from "../components/Heading";
import { useScrollDetection } from "../hooks/useScrollDetection";
import { useCreateChannelModal } from "../hooks/channels/useCreateChannelModal";
import { blockContainerStyle, twStyle } from "../tailwind";
import { useParams } from "react-router-dom";
import { useGetOtherUserBlocks } from "../hooks/feed/useGetOtherUserBlocks";
import { motion } from "framer-motion";
import {
  durationSettings,
  easeSettings,
  fade,
  staggerParentContainer,
} from "../motion";
import { Block2 } from "../components/Block2";
import { replaceHyphensWithSpace } from "../utils";

export const OtherUserProfile = () => {
  const { username, userId } = useParams();

  const usernameCheck = username ? username : "";

  const modifiedUsername = replaceHyphensWithSpace(usernameCheck);

  const userIdCheck = userId ? userId : "";
  const {
    data: blocks,
    isLoading,
    isError,
  } = useGetOtherUserBlocks(userIdCheck);

  const blocksCheck = blocks ? blocks : [];

  const blocksCount = blocksCheck.length;

  const isScrolled = useScrollDetection();
  const {
    showModal,
    handleShowModal,
    title,
    handleTitle,
    isPrivate,
    handleIsPrivate,
    handleSubmit,
  } = useCreateChannelModal();

  return (
    <>
      <div
        className={
          showModal
            ? `fixed w-97% pr-${twStyle.spacing3Xl} h-screen overflow-y-hidden`
            : ""
        }
      >
        <PageHeader
          username={modifiedUsername}
          usernamePath={`/${username}/${userId}/blocks`}
          isScrolled={isScrolled}
          thirdLink={true}
          thirdLinkText="Channels"
          thirdLinkPath=""
          fourthlink={false}
          fourthLinkPath=""
          fourthLinkText=""
          handleShowCreateChannelModal={handleShowModal}
        />

        <Heading
          username={modifiedUsername}
          usernamePath={`/${username}/${userId}/blocks`}
          thirdLink={true}
          thirdLinkText="Blocks"
          thirdLinkPath={`/${username}/${userId}/blocks`}
          fourthlink={false}
          fourthLinkText=""
          fourthLinkPath=""
          count={blocksCount}
        />

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching data.</p>}
        {blocks && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerParentContainer}
            className="flex flex-wrap"
          >
            {blocks.map((block) => (
              <motion.div
                key={block.id}
                variants={fade(durationSettings.fast, easeSettings.easeIn)}
              >
                <Block2
                  blockId={block.id}
                  imagePath={block.imagePath ? block.imagePath : ""}
                  imageData={block.imageData ? block.imageData : ""}
                  text={block.text}
                  blockContainerStyle={`${blockContainerStyle} mb-${twStyle.spacingLg}`}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {showModal && (
        <NewChannelModal
          handleTitle={handleTitle}
          handleIsPrivate={handleIsPrivate}
          handleSubmit={handleSubmit}
          title={title}
          isPrivate={isPrivate}
          handleShowModal={handleShowModal}
          buttonText="Create New Channel"
        />
      )}
    </>
  );
};
