import { Block2 } from "../components/Block2";
import { useGetUserBlocks } from "../hooks/blocks/useGetUserBlocks";

export const Blocks = () => {
  const { data: blocks, isLoading, isError } = useGetUserBlocks();

  return (
    <>
      <h1 className="text-4xl text-center">Blocks</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred while fetching data.</p>}
      {blocks && (
        <div className="flex flex-wrap">
          {blocks.map((block) => (
            <div key={block.id}>
              <Block2
                blockId={block.id}
                imagePath={block.imagePath ? block.imagePath : ""}
                imageData={block.imageData ? block.imageData : ""}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
