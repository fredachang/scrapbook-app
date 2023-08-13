import { useState } from "react";
import { ConfirmModal } from "../components/ConfirmModal";
import { GenericButton } from "../components/GenericButton";
import { Heading } from "../components/Heading";
import { NewChannelModal } from "../components/NewChannelModal";
import { PageHeader } from "../components/PageHeader";
import { useAuthContext } from "../context/AuthContext";
import { useCreateChannelModal } from "../hooks/channels/useCreateChannelModal";
import { useScrollDetection } from "../hooks/useScrollDetection";
import { buttonStyleFull, twStyle, twText } from "../tailwind";
import { convertTimestamp, replaceHyphensWithSpace } from "../utils";

export const Profile = () => {
  const { profile, logout } = useAuthContext();
  const [showConfirmLogOut, setShowConfirmLogOut] = useState(false);
  const userName = `${profile?.firstName}-${profile?.lastName}`;
  const modifiedUsername = replaceHyphensWithSpace(userName);

  const dateCreated = profile?.created ? profile?.created : "";

  const formattedDate = convertTimestamp(dateCreated);

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

  const handleShowConfirmLogOut = () => {
    setShowConfirmLogOut(true);
  };

  const handleHideConfirmLogOut = () => {
    setShowConfirmLogOut(false);
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
          username={modifiedUsername}
          usernamePath={`/${userName}`}
          isScrolled={isScrolled}
          thirdLink={false}
          thirdLinkText=""
          thirdLinkPath=""
          fourthlink={false}
          fourthLinkText=""
          fourthLinkPath=""
          handleShowCreateChannelModal={handleShowModal}
        />

        <Heading
          username={modifiedUsername}
          usernamePath={`/${userName}`}
          thirdLink={false}
          thirdLinkText=""
          thirdLinkPath=""
          fourthlink={false}
          fourthLinkText=""
          fourthLinkPath=""
          includeCount={false}
        />

        <div className={twText.paragraph}>Date Joined: {formattedDate}</div>
        <GenericButton
          buttonText="Log Out"
          buttonStyle={`${buttonStyleFull} mt-${twStyle.spacingLg}`}
          buttonType="button"
          handleOnClick={handleShowConfirmLogOut}
        />
      </div>

      {showConfirmLogOut && (
        <ConfirmModal
          text="Confirm log out?"
          handleYes={logout}
          handleNo={handleHideConfirmLogOut}
        />
      )}
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
    </>
  );
};
