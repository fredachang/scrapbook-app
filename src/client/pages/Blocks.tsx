import { motion } from "framer-motion";
import { Block2 } from "../components/Block2";
import { useGetUserBlocks } from "../hooks/blocks/useGetUserBlocks";
import {
  durationSettings,
  easeSettings,
  fade,
  staggerParentContainer,
} from "../motion";
import { PageHeader } from "../components/PageHeader";
import { useScrollDetection } from "../hooks/useScrollDetection";
import { Heading } from "../components/Heading";
import { useCreateChannelModal } from "../hooks/channels/useCreateChannelModal";
import { NewChannelModal } from "../components/NewChannelModal";
import { blockContainerStyle, twStyle } from "../tailwind";
import { useAuthContext } from "../context/AuthContext";
import { replaceHyphensWithSpace } from "../utils";
import { PlaceholderBlock } from "../components/PlaceholderBlock";

export const Blocks = () => {
  const { data: blocks, isLoading, isError } = useGetUserBlocks();

  const { profile } = useAuthContext();
  const username = `${profile?.firstName}-${profile?.lastName}`;
  const modifiedUsername = replaceHyphensWithSpace(username);

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

  const blockCheck = blocks ? blocks : [];

  const blockCount = blockCheck.length;

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
          usernamePath={`/${username}`}
          thirdLink={true}
          thirdLinkText="Blocks"
          thirdLinkPath=""
          fourthlink={false}
          fourthLinkText=""
          fourthLinkPath=""
          isScrolled={isScrolled}
          handleShowCreateChannelModal={handleShowModal}
        />

        <Heading
          username={modifiedUsername}
          usernamePath={`/${username}`}
          thirdLink={true}
          thirdLinkText="Blocks"
          thirdLinkPath=""
          fourthlink={false}
          fourthLinkText=""
          fourthLinkPath=""
          count={blockCount}
        />

        {blockCount === 0 && <PlaceholderBlock />}
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
        />
      )}
    </>
  );
};
