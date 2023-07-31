import { useNavigate, useParams } from "react-router-dom";
import { Block } from "../components/Block";
import { ImageUploader } from "../components/ImageUploader";
import { useAuthContext } from "../context/AuthContext";
import { useGetConnections } from "../hooks/connections/useGetConnections";
import { useDeleteChannel } from "../hooks/channels/useDeleteChannel";
import { shortenUUID } from "../utils";
import { ChangeEvent, useState } from "react";
import { ConfirmModal } from "../components/ConfirmModal";
import { motion } from "framer-motion";
import { fadeXY, staggerParentContainer } from "../motion";
import { ChannelSettingModal } from "../components/ChannelSettingsModal";
import { useUpdateChannel } from "../hooks/channels/useUpdateChannel";

export const ChannelExpanded = () => {
  const { id, channelTitle, isPrivate } = useParams();

  //deal with the scenario where id could be undefined
  const IdCheck = id ? id : "";
  const channelTitleCheck = channelTitle ? channelTitle : "";

  //isPrivate retrieved from the params will be a string "true" or "false"
  const isPrivateCheck = isPrivate ? JSON.parse(isPrivate) : false;

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showChannelSettings, setShowChannelSettings] = useState(false);
  const [newChannelName, setNewChannelName] = useState(channelTitleCheck);
  const [privateSetting, setPrivateSetting] = useState(isPrivateCheck);

  const { data, isLoading, isError } = useGetConnections();

  const connectionsByChannel = data?.filter((connection) => {
    return connection.channelId === id;
  });

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;
  const updateChannelMutation = useUpdateChannel();

  const navigate = useNavigate();
  const deleteMutation = useDeleteChannel();

  const handleShowChannelSettings = () => {
    setShowChannelSettings(true);
  };

  const handleHideChannelSettings = () => {
    setShowChannelSettings(false);
  };

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleHideConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setNewChannelName(newTitle);
  };

  const handlePrivateSetting = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateSetting(e.target.checked);
  };

  const handleUpdateChannelSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const variables = {
      title: newChannelName,
      isPrivate: privateSetting,
      channelId: IdCheck,
    };

    updateChannelMutation.mutateAsync(variables).then(() => {
      navigate(
        `/channels/${userName}/${newChannelName}/${id}/${privateSetting}`,
        {
          replace: true,
        }
      );
      setShowChannelSettings(false);
      setNewChannelName("");
      setPrivateSetting(false);
    });
  };

  const handleDeleteChannel = () => {
    if (id) {
      const variables = {
        channelId: id,
      };

      deleteMutation.mutateAsync(variables).then(() => {
        navigate(`/channels/${userName}`, { replace: true });
      });
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center">{channelTitle}</h1>

      <div className="bg-slate-100 flex m-4">
        <div className="flex flex-col">
          <p className="text-xs">{shortenUUID(id)}</p>
          <p className="text-xs">
            {isPrivateCheck ? "Private Channel" : "Public Channel"}
          </p>

          <button onClick={handleShowConfirmDelete} className="text-xs">
            Delete Channel
          </button>
          <button onClick={handleShowChannelSettings} className="text-xs">
            Update Channel Settings
          </button>
          {showConfirmDelete && (
            <ConfirmModal
              text="confirm delete?"
              handleHideConfirmDelete={handleHideConfirmDelete}
              handleDeleteChannel={handleDeleteChannel}
            />
          )}
          {showChannelSettings && (
            <ChannelSettingModal
              handleHideChannelSettings={handleHideChannelSettings}
              newChannelName={newChannelName}
              privateSetting={privateSetting}
              handleInput={handleInput}
              handlePrivateSetting={handlePrivateSetting}
              handleUpdateChannelSettings={handleUpdateChannelSettings}
            />
          )}
        </div>

        <div>
          <ImageUploader
            channelId={IdCheck}
            channelTitle={channelTitleCheck}
            isPrivate={isPrivateCheck}
          />
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error occurred while fetching data.</p>}
        </div>

        <motion.div
          className="bg-red-100 flex flex-row overflow-x-hidden"
          initial="hidden"
          animate="visible"
          variants={staggerParentContainer}
        >
          {connectionsByChannel?.map((connection) => {
            return (
              <motion.div key={connection?.blockId} variants={fadeXY}>
                <Block
                  blockId={connection?.blockId}
                  channelId={IdCheck}
                  isPrivate={isPrivateCheck}
                  channelTitle={channelTitleCheck}
                  imagePath={connection.imagePath}
                  imageData={connection.imageData}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};
