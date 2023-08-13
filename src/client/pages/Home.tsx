import { Heading } from "../components/Heading";
import { NewChannelModal } from "../components/NewChannelModal";
import { PageHeader } from "../components/PageHeader";
import { SocialPost } from "../components/SoicalPost";
import { useAuthContext } from "../context/AuthContext";
import { useCreateChannelModal } from "../hooks/channels/useCreateChannelModal";
import { useGetFeed } from "../hooks/feed/useGetFeed";
import { useScrollDetection } from "../hooks/useScrollDetection";
import { twStyle } from "../tailwind";
import { replaceHyphensWithSpace } from "../utils";

export const Home = () => {
  const { data: feeds, isLoading, isError } = useGetFeed();

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;

  const modifiedUsername = replaceHyphensWithSpace(userName);

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
          thirdLink={true}
          thirdLinkText="Feed"
          thirdLinkPath="/"
          fourthlink={false}
          fourthLinkText=""
          fourthLinkPath=""
          handleShowCreateChannelModal={handleShowModal}
        />

        <Heading
          username={modifiedUsername}
          usernamePath={`/${userName}`}
          thirdLink={true}
          thirdLinkText="Feed"
          thirdLinkPath="/"
          fourthlink={false}
          fourthLinkText=""
          fourthLinkPath=""
          includeCount={true}
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
    </>
  );
};
