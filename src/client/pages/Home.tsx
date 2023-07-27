import { ChannelFeed } from "../components/ChannelFeed";
import { useGetFeedConnections } from "../hooks/feed/useGetFeed";

export const Home = () => {
  const { data: feed, isLoading, isError } = useGetFeedConnections();

  console.log(feed);
  return (
    <>
      <h1 className="text-4xl text-center">Home</h1>
      <ChannelFeed />
    </>
  );
};
