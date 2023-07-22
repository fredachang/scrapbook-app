import { useGetBlocks } from "../hooks/useGetBlocks";

export const Blocks = () => {
  const { data: blocks, isLoading, isError } = useGetBlocks();

  return (
    <>
      <h1 className="text-4xl text-center">Blocks</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred while fetching data.</p>}
      {blocks && (
        <ul>
          {blocks.map((block) => (
            <div key={block.block_id}>
              <p>{block.block_id}</p>
              <img src={block.image_path} />
            </div>
          ))}
        </ul>
      )}
    </>
  );
};
