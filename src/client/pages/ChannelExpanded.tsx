import { useNavigate, useParams } from "react-router-dom";
import { Block } from "../components/Block";
import { useAuthContext } from "../context/AuthContext";
import { useGetConnections } from "../hooks/connections/useGetConnections";
import { useDeleteChannel } from "../hooks/channels/useDeleteChannel";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  durationSettings,
  easeSettings,
  fade,
  staggerParentContainer,
} from "../motion";
import { useUpdateChannel } from "../hooks/channels/useUpdateChannel";
import { Uploader } from "../components/Uploader";

import { buttonStyleFull, twStyle } from "../tailwind";
import { ConfirmModal } from "../components/ConfirmModal";
import { ChannelSettingModal } from "../components/ChannelSettingsModal";
import { PageHeader } from "../components/PageHeader";
import { useScrollDetection } from "../hooks/useScrollDetection";
import { Heading } from "../components/Heading";
import { GenericButton } from "../components/GenericButton";
import { useCreateChannelModal } from "../hooks/channels/useCreateChannelModal";
import { NewChannelModal } from "../components/NewChannelModal";

export const ChannelExpanded = () => {
  const { id, channelTitle, isPrivate: privateCheck } = useParams();

  //deal with the scenario where id could be undefined
  const IdCheck = id ? id : "";
  const channelTitleCheck = channelTitle ? channelTitle : "";

  //isPrivate retrieved from the params will be a string "true" or "false"
  const isPrivateCheck = privateCheck ? JSON.parse(privateCheck) : false;

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showChannelSettings, setShowChannelSettings] = useState(false);
  const [newChannelName, setNewChannelName] = useState(channelTitleCheck);
  const [privateSetting, setPrivateSetting] = useState(isPrivateCheck);

  const { data, isLoading, isError } = useGetConnections();

  const connectionsByChannel = data?.filter((connection) => {
    return connection.channelId === id;
  });

  const connectionsCheck = connectionsByChannel ? connectionsByChannel : [];

  const connectionsCount = connectionsCheck.length;

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;
  const updateChannelMutation = useUpdateChannel();

  const navigate = useNavigate();
  const isScrolled = useScrollDetection();
  const deleteMutation = useDeleteChannel();
  const {
    showModal,
    handleShowModal,
    title,
    handleTitle,
    isPrivate,
    handleIsPrivate,
    handleSubmit,
  } = useCreateChannelModal();

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
      <div
        className={
          showModal
            ? `fixed w-97% pr-${twStyle.spacing3Xl} h-screen overflow-y-hidden`
            : ""
        }
      >
        <PageHeader
          isScrolled={isScrolled}
          thirdLink={true}
          thirdLinkText="Channels"
          thirdLinkPath={`/channels/${userName}`}
          fourthlink={true}
          fourthLinkText={channelTitleCheck}
          fourthLinkPath=""
          handleShowCreateChannelModal={handleShowModal}
        />

        <Heading
          thirdLink={true}
          thirdLinkText="Channels"
          thirdLinkPath={`/channels/${userName}`}
          fourthlink={true}
          fourthLinkText={channelTitleCheck}
          fourthLinkPath=""
          count={connectionsCount}
        />

        <div>
          <GenericButton
            buttonText="Update Channel"
            buttonStyle={buttonStyleFull}
            buttonType="button"
            handleOnClick={handleShowChannelSettings}
          />
          <GenericButton
            buttonText="Delete Channel"
            buttonStyle={buttonStyleFull}
            buttonType="button"
            handleOnClick={handleShowConfirmDelete}
          />
        </div>

        {showConfirmDelete && (
          <ConfirmModal
            text="confirm delete?"
            handleNo={handleHideConfirmDelete}
            handleYes={handleDeleteChannel}
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

        <div className="flex">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error occurred while fetching data.</p>}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerParentContainer}
            className="flex flex-wrap"
          >
            <div>
              <Uploader
                channelId={IdCheck}
                channelTitle={channelTitleCheck}
                isPrivate={isPrivateCheck}
              />
            </div>
            {connectionsByChannel?.map((connection) => {
              return (
                <motion.div
                  key={connection?.blockId}
                  variants={fade(durationSettings.fast, easeSettings.easeIn)}
                  className={`mb-${twStyle.spacingMd}`}
                >
                  <Block
                    blockId={connection?.blockId}
                    channelId={IdCheck}
                    isPrivate={isPrivateCheck}
                    channelTitle={channelTitleCheck}
                    imagePath={connection.imagePath}
                    imageData={connection.imageData}
                    text={connection.text}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

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
      </div>
    </>
  );
};
