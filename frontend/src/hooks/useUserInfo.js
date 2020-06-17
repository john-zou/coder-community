import { useSelector } from "react-redux";
import useApi from "./useFakeApi"; // replace with real API once we have back end

function dummyProfile(username) {
  return {
    username,
    firstName: "Nick",
    lastName: "Lee",
    title: "Senior Developer at Microsoft",
    numFollowers: 120,
    numPosts: 20,
    avatarImgSrc:
      "https://cdn.vox-cdn.com/uploads/chorus_image/image/66129639/pokemon_piplup.0.png",
    bannerImgSrc:
      "https://images.unsplash.com/photo-1470137430626-983a37b8ea46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  };
}

export function useUserInfo(username) {
  const user = useSelector((state) => state.user);
  const [{ data, loading, error }] = useApi(
    "GET",
    `/u/${username}`,
    dummyProfile(username)
  );

  if (data) {
    if (
      user.isLoggedIn &&
      user.username.toLowerCase() === username.toLowerCase()
    ) {
      data.isUser = true;
    }
  }

  return [data, loading, error];
}
