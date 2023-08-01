import { useQuery } from "react-query";
import { FeedFolded } from "../../../common/types";
import { useAuthContext } from "../../context/AuthContext";
import { queryKeys } from "../queryKeys";
import { apiUrl } from "../../apiUrl";

const getFeed = async (token?: string): Promise<FeedFolded[]> => {
  const data = await fetch(`${apiUrl}/user/feed`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  const res = await data.json();

  return res;
};

export const useGetFeed = () => {
  const { authToken } = useAuthContext();
  return useQuery<FeedFolded[], Error>(queryKeys.social.getFeed, () =>
    getFeed(authToken)
  );
};
