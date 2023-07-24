import { Block } from "../components/Block";
import { ImageUploader } from "../components/ImageUploader";
import { useGetConnections } from "../hooks/UseGetConnections";
import { useGetUserBlocks } from "../hooks/useGetUserBlocks";

interface Props {
  id: string;
  title: string;
}

export const Channel = (props: Props) => {
  const { id, title } = props;
  const { data, isLoading, isError } = useGetConnections();

  const connectionsByChannel = data?.filter((connection) => {
    return connection.channel_id === id;
  });

  return (
    <>
      <div className="bg-slate-100 flex m-4">
        <h1>{title}</h1>
        <ImageUploader channelId={id} />
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching data.</p>}

        {connectionsByChannel?.map((connection) => (
          <Block
            key={connection?.block_id}
            id={connection?.block_id}
            imagePath={connection?.image_path}
          />
        ))}
      </div>
    </>
  );
};
