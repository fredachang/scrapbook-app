import { useState } from "react";
import { NewChannelModal } from "../components/NewChannelModal";

import { useGetChannels } from "../hooks/channels/useGetChannels";
import { Channel } from "../components/Channel";
import React from "react";
import { PageHeader } from "../components/PageHeader";
import { Heading } from "../components/Heading";
import { useScrollDetection } from "../hooks/useScrollDetection";
import { useCreateChannelModal } from "../hooks/channels/useCreateChannelModal";

export const Channels = () => {
  const { data: channels, isLoading, isError } = useGetChannels();
  const [input, setInput] = useState("");

  const channelsCheck = channels ? channels : [];

  const channelsCount = channelsCheck.length;

  const isScrolled = useScrollDetection();
  const {
    showModal,
    handleShowModal,
    title,
    handleTitle,
    isPrivate,
    handleIsPrivate,
    handleSubmit,
  } = useCreateChannelModal();

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
      <PageHeader
        isScrolled={isScrolled}
        thirdLink={true}
        thirdLinkText="Channels"
        thirdLinkPath=""
        fourthlink={false}
        fourthLinkPath=""
        fourthLinkText=""
        handleShowCreateChannelModal={handleShowModal}
        inputValue={input}
        handleInput={handleInput}
        handleClear={handleClear}
      />

      <Heading
        thirdLink={true}
        thirdLinkText="Channels"
        thirdLinkPath=""
        fourthlink={false}
        fourthLinkText=""
        fourthLinkPath=""
        count={channelsCount}
      />

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
    </>
  );
};
