import { useCreateChannelModal } from "../hooks/channels/useCreateChannelModal";
import { breadcrumbStyle, twStyle, twText } from "../tailwind";
import { GenericButton } from "./GenericButton";
import { NewChannelModal } from "./NewChannelModal";

export const PlaceholderBlock = () => {
  const {
    showModal,
    handleShowModal,
    title,
    handleTitle,
    isPrivate,
    handleIsPrivate,
    handleSubmit,
  } = useCreateChannelModal();

  return (
    <>
      <div
        className={`relative flex flex-col justify-center items-center ${twStyle.blockDimensions} border border-${twStyle.highlightColour} mr-${twStyle.spacingLg}`}
      >
        <p className={`${twText.heading} mb-${twStyle.spacingMd}`}>
          Start By Creating a New Channel
        </p>
        <GenericButton
          buttonText="New Channel +"
          buttonStyle={`${twText.heading} ${breadcrumbStyle}`}
          buttonType="button"
          handleOnClick={handleShowModal}
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
          buttonText="Create New Channel"
        />
      )}
    </>
  );
};
