import { useState } from "react";
import { NewChannelModal } from "../components/NewChannelModal";

import { useGetChannels } from "../hooks/channels/useGetChannels";
import { Channel } from "../components/Channel";
import React from "react";
import { PageHeader } from "../components/PageHeader";
import { Heading } from "../components/Heading";
import { useScrollDetection } from "../hooks/useScrollDetection";
import { useCreateChannelModal } from "../hooks/channels/useCreateChannelModal";
import { twStyle } from "../tailwind";
import { useAuthContext } from "../context/AuthContext";
import { replaceHyphensWithSpace } from "../utils";
import { PlaceholderBlock } from "../components/PlaceholderBlock";

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

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;
  const modifiedUsername = replaceHyphensWithSpace(userName);

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
      <div
        className={
          showModal
            ? `fixed w-97% pr-${twStyle.spacing3Xl} h-screen overflow-y-hidden`
            : ""
        }
      >
        <PageHeader
          username={userName}
          usernamePath={`/${userName}`}
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
          username={modifiedUsername}
          usernamePath={`/${userName}`}
          thirdLink={true}
          thirdLinkText="Channels"
          thirdLinkPath=""
          fourthlink={false}
          fourthLinkText=""
          fourthLinkPath=""
          includeCount={true}
          count={channelsCount}
        />
        {channelsCount === 0 && <PlaceholderBlock />}

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching data.</p>}

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

      {showModal && (
        <NewChannelModal
          handleTitle={handleTitle}
          handleIsPrivate={handleIsPrivate}
          handleSubmit={handleSubmit}
          title={title}
          isPrivate={isPrivate}
          handleShowModal={handleShowModal}
          buttonText="Create New Channel"
        />
      )}
    </>
  );
};
