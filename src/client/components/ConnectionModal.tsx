import { ChangeEvent, useState } from "react";
import { useGetChannels } from "../hooks/useGetChannels";

interface Props {
  handleCloseConnectButton: (e: React.MouseEvent<HTMLElement>) => void;
}

export const ConnectionModal = (props: Props) => {
  const { data: channels, isLoading, isError } = useGetChannels();

  const { handleCloseConnectButton } = props;
  const [filteredChannels, setFilteredChannels] = useState(channels);
  const [input, setInput] = useState("");

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

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching data.</p>}

        {filteredChannels && (
          <ul>
            {filteredChannels.map((channel) => (
              <div key={channel.id}>
                <button>{channel.title}</button>
              </div>
            ))}
          </ul>
        )}

        <button className="text-center" onClick={handleCloseConnectButton}>
          Close
        </button>
      </div>
    </>
  );
};
