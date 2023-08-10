import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCreateConnection } from "../hooks/connections/useCreateConnection";
import { useGetChannels } from "../hooks/channels/useGetChannels";
import React from "react";
import {
  buttonStyleFull,
  defaultInputStyle,
  twStyle,
  twText,
} from "../tailwind";
import { GenericButton } from "./GenericButton";
import { useGetBlockChannels } from "../hooks/blocks/useGetBlockChannels";
import { motion } from "framer-motion";
import { fadeXY, staggerParentContainer } from "../motion";

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
            className={`${defaultInputStyle} px-${twStyle.spacingSm} mb-${twStyle.spacingSm} `}
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
                variants={fadeXY}
                key={channel.id}
                className={`
               ${
                 alreadyInChannel(channel.id) &&
                 `text-${twStyle.dimColour} hover:bg-${twStyle.primaryColour}`
               }
                hover:bg-${twStyle.secondaryColour}
                ${twText.paragraph} mb-${twStyle.spacingSm}`}
              >
                <button
                  onClick={() => {
                    !alreadyInChannel(channel.id) &&
                      handleClickChannel(channel.id, channel.isPrivate);
                  }}
                  disabled={alreadyInChannel(channel.id)}
                >
                  <p className="text-left">{channel.title}</p>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <GenericButton
          buttonStyle={buttonStyleFull}
          buttonText="Close"
          handleOnClick={handleCloseConnect}
          buttonType="button"
        />
      </div>
    </>
  );
};
