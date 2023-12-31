import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCreateConnection } from "../hooks/connections/useCreateConnection";
import { useGetChannels } from "../hooks/channels/useGetChannels";
import React from "react";
import {
  buttonStyleFull,
  buttonStyleFullNoBorder,
  fullInputStyle,
  twStyle,
  twText,
} from "../tailwind";
import { GenericButton } from "./GenericButton";
import { useGetBlockChannels } from "../hooks/blocks/useGetBlockChannels";
import { motion } from "framer-motion";
import {
  durationSettings,
  easeSettings,
  fade,
  staggerParentContainer,
} from "../motion";
import { NewChannelModal } from "./NewChannelModal";
import { useCreateChannelModalWithBlock } from "../hooks/channels/useCreateChannelModalWithBlock";

interface Props {
  blockId: string;
  channelTitle: string;
  handleCloseConnect: () => void;
}

export const ConnectionModal = (props: Props) => {
  const { handleCloseConnect, blockId, channelTitle } = props;
  const [input, setInput] = useState("");

  const { data: channels } = useGetChannels();

  const createConnectionMutation = useCreateConnection(blockId);
  const { data: blockChannels } = useGetBlockChannels(blockId);
  const {
    showModal,
    handleShowModal,
    title,
    handleTitle,
    isPrivate,
    handleIsPrivate,
    handleSubmit,
  } = useCreateChannelModalWithBlock(blockId, handleCloseConnect);

  const blockChannelIds = blockChannels?.map((channel) => channel.id);

  const alreadyInChannel = (id: string) => {
    return blockChannelIds?.includes(id) ?? false;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const handleFilterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInput(input);
  };

  const filteredChannels = React.useMemo(() => {
    const filteredList =
      channels?.filter((channel) =>
        channel.title.toLowerCase().includes(input.toLowerCase())
      ) ?? [];

    return filteredList;
  }, [channels, input]);

  const handleClickChannel = (channelId: string, isPrivate: boolean) => {
    const variables = {
      channelId: channelId,
      blockId: blockId,
    };

    createConnectionMutation.mutateAsync(variables).then(() => {
      const currentPath = location.pathname;

      let targetUrl: string;

      switch (currentPath) {
        case `/channels/${userName}`:
          targetUrl = `/channels/${userName}`;
          break;
        case `/blocks/${userName}`:
          targetUrl = `/blocks/${userName}`;
          break;
        case `/channels/${userName}/${channelTitle}/${channelId}/${isPrivate}`:
          targetUrl = `/channels/${userName}/${channelTitle}/${channelId}/${isPrivate}`;
          break;
        default:
          targetUrl = `/channels/${userName}`;
      }

      navigate(targetUrl, { replace: true });
      setInput("");
      handleCloseConnect();
    });
  };

  return (
    <>
      <div
        className={`bg-${twStyle.primaryColour} w-full h-full flex flex-col justify-between`}
      >
        <div>
          <input
            type="text"
            placeholder="Type to filter..."
            value={input}
            onChange={handleFilterList}
            className={`${fullInputStyle} px-${twStyle.spacingSm} mb-${twStyle.spacingSm} `}
          />
          <motion.div
            className={`px-${twStyle.spacingSm}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={staggerParentContainer}
          >
            {filteredChannels.map((channel) => (
              <motion.div
                variants={fade(durationSettings.fast, easeSettings.easeIn)}
                key={channel.id}
                className={`
               ${
                 alreadyInChannel(channel.id) &&
                 `text-${twStyle.dimColour} hover:bg-${twStyle.primaryColour}`
               }
                hover:bg-${twStyle.secondaryColour}
                ${twText.paragraph} mb-${twStyle.spacingSm} ${
                  twStyle.textColour
                }`}
              >
                <button
                  onClick={() => {
                    !alreadyInChannel(channel.id) &&
                      handleClickChannel(channel.id, channel.isPrivate);
                  }}
                  className="w-full"
                  disabled={alreadyInChannel(channel.id)}
                >
                  <p className="text-left">{channel.title}</p>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <GenericButton
          buttonStyle={`${buttonStyleFullNoBorder}`}
          buttonText="New Channel +"
          buttonType="button"
          handleOnClick={handleShowModal}
        />

        <GenericButton
          buttonStyle={buttonStyleFull}
          buttonText="Close"
          handleOnClick={handleCloseConnect}
          buttonType="button"
        />
      </div>

      {showModal && (
        <NewChannelModal
          handleTitle={handleTitle}
          handleIsPrivate={handleIsPrivate}
          handleSubmit={handleSubmit}
          title={title}
          isPrivate={isPrivate}
          handleShowModal={handleShowModal}
          buttonText="Add Block to New Channel"
        />
      )}
    </>
  );
};
