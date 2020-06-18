import { randomImage } from "../util/helpers";
const initialData = {
  user: {
    isLoggedIn: true,
    userID: "nick_lee", //should be unique for querying mongodb
    name: "Nick Lee", //displayed name
    profilePic: randomImage(),
    backgroundImg: randomImage(),
    status: "work at Microsoft",
    followers: ["evan_you", "gaeron"],
  },
  posts: [
    {
      title: "CCS Tricks",
      content: "CSS grid is cool!",
      tags: ["css", "frontend"],
      featuredImg: randomImage(),
      create_at: Date.parse("2020-05-02 5:55"),
      likes: 19,
      comments: [
        {
          authorID: "evan_you",
          comment: "Great article!",
          timeStamp: Date.parse("2020-06-17 5:55"),
        },
        {
          authorID: "gaeron",
          comment: "Cool!",
          timeStamp: Date.parse("2020-06-17 7:00"),
        },
      ],
    },
    {
      title: "Vue JS is great too, check it out",
      content:
        "I figured, what if I could just extract the part that I really liked about React and build something really lightweight without all the extra concepts involved? I was also curious as to how its internal implementation worked. I started this experiment just trying to replicate this minimal feature set, like declarative data binding. That was basically how Vue started.",
      tags: ["vue js"],
      featuredImg: randomImage(),
      create_at: Date.parse("2020-05-07 8:08"),
      likes: 89,
      comments: [
        {
          authorID: "evan_you",
          comment: "Amazing!",
          timeStamp: Date.parse("2020-06-14 6:55"),
        },
        {
          authorID: "gaeron",
          comment: "Cool article!",
          timeStamp: Date.parse("2020-06-15 8:00"),
        },
      ],
    },
  ],
  videos: [], //a video post
  groups: [
    {
      groupID: "programmers_in_vancouver",
      name: "Programmers in Vancouver",
    },
    {
      groupID: "vannila_javaScript_lovers",
      name: "Vannila JavaScript Lovers",
    },
  ],
  currentViewedProfile: {
    //current public profile being viewed by user
    userID: "gaeron",
    name: "Dan Abamov",
    profilePic: randomImage(),
    backgroundImg: randomImage(),
    status: "did not create ReactJS",
    followers: 120,
    posts: 20,
  },
};

export type RootState = typeof initialData;
export type User = typeof initialData.user;
export type CurrentViewedProfile = typeof initialData.currentViewedProfile;

export default initialData;
