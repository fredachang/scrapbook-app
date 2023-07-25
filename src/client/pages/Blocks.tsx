import { Block } from "../components/Block";
import { useGetUserBlocks } from "../hooks/useGetUserBlocks";

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
              <Block
                id={block.id}
                imagePath={block.image_path ? block.image_path : ""}
                imageData={block.image_data ? block.image_data : ""}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
