import { useNavigate } from "react-router-dom";
import { Block } from "../components/Block";
import { ImageUploader } from "../components/ImageUploader";
import { useAuthContext } from "../context/AuthContext";
import { useGetConnections } from "../hooks/connections/useGetConnections";
import { useDeleteChannel } from "../hooks/channels/useDeleteChannel";

interface Props {
  id: string;
  title: string;
}

export const Channel = (props: Props) => {
  const { id, title } = props;
  const { data, isLoading, isError } = useGetConnections();

  const connectionsByChannel = data?.filter((connection) => {
    return connection.channelId === id;
  });

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const navigate = useNavigate();
  const deleteMutation = useDeleteChannel();

  function shortenUUID(id: string) {
    return id.split("-")[0];
  }

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
          <p className="text-xs">{shortenUUID(id)}</p>
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
                key={connection?.blockId}
                blockId={connection?.blockId}
                channelId={id}
                imagePath={connection.imagePath}
                imageData={connection.imageData}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
