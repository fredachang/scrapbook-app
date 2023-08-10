import { Heading } from "../components/Heading";
import { NewChannelModal } from "../components/NewChannelModal";
import { PageHeader } from "../components/PageHeader";
import { SocialPost } from "../components/SoicalPost";
import { useCreateChannelModal } from "../hooks/channels/useCreateChannelModal";
import { useGetFeed } from "../hooks/feed/useGetFeed";
import { useScrollDetection } from "../hooks/useScrollDetection";

export const Home = () => {
  const { data: feeds, isLoading, isError } = useGetFeed();

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

  const feedsCheck = feeds ? feeds : [];
  const feedsCount = feedsCheck.length;

  return (
    <>
      <PageHeader
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
        thirdLink={false}
        thirdLinkText=""
        thirdLinkPath=""
        fourthlink={false}
        fourthLinkText=""
        fourthLinkPath=""
        count={feedsCount}
      />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred while fetching data.</p>}
      {feeds &&
        feeds.map((feed) => {
          return (
            <div key={feed.key}>
              <SocialPost
                created={feed.created}
                firstName={feed.firstName}
                lastName={feed.lastName}
                channelTitle={feed.channelTitle}
                channelId={feed.channelId}
                blocks={feed.blocks}
                userId={feed.userId}
              />
            </div>
          );
        })}
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
