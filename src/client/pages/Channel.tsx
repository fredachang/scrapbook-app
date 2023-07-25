import { useNavigate } from "react-router-dom";
import { Block } from "../components/Block";
import { ImageUploader } from "../components/ImageUploader";
import { useAuthContext } from "../context/AuthContext";
import { useGetConnections } from "../hooks/UseGetConnections";
import { useDeleteChannel } from "../hooks/useDeleteChannel";

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

  const { profile } = useAuthContext();
  const navigate = useNavigate();
  const deleteMutation = useDeleteChannel();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const handleDeleteChannel = () => {
    const variables = {
      channelId: id,
    };

    deleteMutation.mutateAsync(variables).then(() => {
      navigate(`/channels/${userName}`, { replace: true });
    });
  };

  return (
    <>
      <div className="bg-slate-100 flex m-4">
        <div>
          <h1>{title}</h1>
          <button onClick={handleDeleteChannel} className="text-xs">
            Delete Channel
          </button>
        </div>

        <div>
          <ImageUploader channelId={id} />
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error occurred while fetching data.</p>}
        </div>

        <div className="bg-red-100 flex flex-row overflow-x-hidden">
          {connectionsByChannel?.map((connection) => {
            return (
              <Block
                key={connection?.block_id}
                id={connection?.block_id}
                imagePath={connection.image_path}
                imageData={connection.image_data}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
