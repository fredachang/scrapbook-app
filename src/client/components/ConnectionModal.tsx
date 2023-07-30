import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCreateConnection } from "../hooks/connections/useCreateConnection";
import { useGetChannels } from "../hooks/channels/useGetChannels";

interface Props {
  blockId: string;
  handleCloseConnect: () => void;
}

export const ConnectionModal = (props: Props) => {
  const { handleCloseConnect, blockId } = props;
  const [input, setInput] = useState("");

  const { data: channels, isLoading } = useGetChannels();
  const [filteredChannels, setFilteredChannels] = useState(channels);

  const createConnectionMutation = useCreateConnection();
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const handleFilterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterText = e.target.value;
    setInput(filterText);
    filterList(filterText);
  };

  const filterList = (filterText: string) => {
    const filteredList = channels?.filter((channel) =>
      channel.title.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredChannels(filteredList);
  };

  const handleClickChannel = (channelId: string) => {
    const variables = {
      channelId: channelId,
      blockId: blockId,
    };

    createConnectionMutation.mutateAsync(variables).then(() => {
      const currentPath = location.pathname;

      let targetUrl;

      switch (currentPath) {
        case `/channels/${userName}`:
          targetUrl = `/channels/${userName}`;
          break;
        case `/blocks/${userName}`:
          targetUrl = `/blocks/${userName}`;
          break;
        case `/`:
          targetUrl = `/`;
          break;
        default:
          targetUrl = "/";
      }

      navigate(targetUrl, { replace: true });
      setInput("");
      handleCloseConnect();
    });
  };

  return (
    <>
      <div className="bg-slate-200 w-full h-full">
        <p>Connection Modal</p>
        <input
          type="text"
          placeholder="Type to filter..."
          value={input}
          onChange={handleFilterList}
        />

        {filteredChannels && (
          <ul>
            {isLoading && "Loading..."}
            {filteredChannels.map((channel) => (
              <div key={channel.id}>
                <button onClick={() => handleClickChannel(channel.id)}>
                  {channel.title}
                </button>
              </div>
            ))}
          </ul>
        )}

        <button className="text-center" onClick={handleCloseConnect}>
          Close
        </button>
      </div>
    </>
  );
};
