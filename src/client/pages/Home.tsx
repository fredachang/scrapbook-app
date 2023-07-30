import { SocialPost } from "../components/SoicalPost";
import { useGetFeed } from "../hooks/feed/useGetFeed";

export const Home = () => {
  const { data: feeds, isLoading, isError } = useGetFeed();

  return (
    <>
      <h1 className="text-4xl text-center">Home</h1>
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
    </>
  );
};
