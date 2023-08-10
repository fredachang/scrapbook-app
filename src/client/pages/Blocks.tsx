import { motion } from "framer-motion";
import { Block2 } from "../components/Block2";
import { useGetUserBlocks } from "../hooks/blocks/useGetUserBlocks";
import { fadeXY, staggerParentContainer } from "../motion";
import { PageHeader } from "../components/PageHeader";
import { useScrollDetection } from "../hooks/useScrollDetection";
import { Heading } from "../components/Heading";
import { useCreateChannelModal } from "../hooks/channels/useCreateChannelModal";
import { NewChannelModal } from "../components/NewChannelModal";

export const Blocks = () => {
  const { data: blocks, isLoading, isError } = useGetUserBlocks();

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
      <PageHeader
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
        thirdLink={true}
        thirdLinkText="Blocks"
        thirdLinkPath=""
        fourthlink={false}
        fourthLinkText=""
        fourthLinkPath=""
        count={blockCount}
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
            <motion.div key={block.id} variants={fadeXY}>
              <Block2
                blockId={block.id}
                imagePath={block.imagePath ? block.imagePath : ""}
                imageData={block.imageData ? block.imageData : ""}
                text={block.text}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
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
