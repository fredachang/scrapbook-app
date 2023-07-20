import { useEffect, useState } from "react";

export const UserBlocks = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const getBlocks = async () => {
      const response = await fetch("http://localhost:4000/blocks");
      const data = await response.json();
      setBlocks(data);
    };

    getBlocks();
  }, []);

  return (
    <>
      {blocks.map((block) => (
        <div id={block.block_id} key={block.block_id}>
          <img
            className="w-1/2 h-1/2"
            src={block.image_path}
            alt={`Block ${block.block_id}`}
          />
        </div>
      ))}
    </>
  );
};
