import { ChangeEvent, useState } from "react";
import { NewChannelModal } from "../components/NewChannelModal";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { useGetChannels } from "../hooks/channels/useGetChannels";
import { useCreateChannel } from "../hooks/channels/useCreateChannel";
import { Channel } from "../components/Channel";
import React from "react";

export const Channels = () => {
  const { data: channels, isLoading, isError } = useGetChannels();
  const { profile } = useAuthContext();
  const [input, setInput] = useState("");
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const navigate = useNavigate();
  const newChannelMutation = useCreateChannel();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleIsPrivate = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const variables = {
      title: title,
      isPrivate: isPrivate,
    };

    newChannelMutation.mutateAsync(variables).then(() => {
      navigate(`/channels/${userName}`, { replace: true });
      setShowModal(false);
      setTitle("");
      setIsPrivate(false);
    });
  };

  const handleShowModal = () => {
    setShowModal((prevValue) => !prevValue);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInput(input);
  };

  const handleClear = () => {
    setInput("");
  };

  const filteredChannels = React.useMemo(() => {
    const filteredList =
      channels?.filter((channel) =>
        channel.title.toLowerCase().includes(input.toLowerCase())
      ) ?? [];

    return filteredList;
  }, [channels, input]);

  return (
    <>
      <div className="">
        <h1 className="text-4xl text-center">Channels</h1>
        <div className="flex justify-between">
          <button onClick={handleShowModal}>Create New</button>
          <div>
            <input
              type="text"
              placeholder="Type to filter..."
              value={input}
              onChange={handleInput}
            />
            <button onClick={handleClear}>Clear</button>
          </div>
        </div>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching data.</p>}

        {showModal && (
          <NewChannelModal
            handleTitle={handleTitle}
            handleIsPrivate={handleIsPrivate}
            handleSubmit={handleSubmit}
            title={title}
            isPrivate={isPrivate}
            handleShowModal={handleShowModal}
          />
        )}

        <ul>
          {filteredChannels?.map((channel, idx) => (
            <div key={`${channel.id}-${idx}`}>
              <Channel
                id={channel.id}
                channelTitle={channel.title}
                isPrivate={channel.isPrivate}
              />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
