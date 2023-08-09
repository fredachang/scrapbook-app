import { PageHeader } from "../components/PageHeader";
import { SocialPost } from "../components/SoicalPost";
import { useGetFeed } from "../hooks/feed/useGetFeed";
import { twStyle } from "../tailwind";

export const Home = () => {
  const { data: feeds, isLoading, isError } = useGetFeed();

  const feedsCheck = feeds ? feeds : [];
  const feedsCount = feedsCheck.length;

  return (
    <>
      <PageHeader count={feedsCount} buttonContainerClass="hidden" />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred while fetching data.</p>}
      {feeds &&
        feeds.map((feed) => {
          return (
            <div key={feed.key} className={`mb-${twStyle.spacingMd}`}>
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
    </>
  );
};
