import { motion } from "framer-motion";
import { Block2 } from "../components/Block2";
import { useGetUserBlocks } from "../hooks/blocks/useGetUserBlocks";
import { fadeXY, staggerParentContainer } from "../motion";

export const Blocks = () => {
  const { data: blocks, isLoading, isError } = useGetUserBlocks();

  return (
    <>
      <h1 className="text-4xl text-center">Blocks</h1>
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
    </>
  );
};
