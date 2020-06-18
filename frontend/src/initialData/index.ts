import {
  randomImage,
  randomBackgroundImage,
  howLongAgo,
} from "../util/helpers";

const initialData = {
  user: {
    isLoggedIn: true,
    userID: "nick_lee", //should be unique for querying mongodb
    name: "Nick Lee", //displayed name
    profilePic: randomImage(),
    backgroundImg: randomBackgroundImage(),
    status: "work at Microsoft",
    followers: ["evan_you", "gaeron"],
  },
  trendingPosts: [
    //the 10 most trending posts shown on home page (trending = newest + most liked + most commented on)
    {
      authorID: "nick_lee", //for viewing author's public profile
      authorName: "Nick Lee",
      authorImg: randomImage(),
      postID: "css-tricks", //when user interacts with the post (such as clicking, liking it)
      title: "CCS Tricks",
      previewContent: "CSS grid is cool!",
      tags: ["css", "frontend"],
      featuredImg: randomImage(),
      createAt: howLongAgo(Date.now() - 1000000),
      likes: 100,
      comments: 29,
    },
    {
      authorID: "nick_lee",
      authorName: "Nick Lee",
      authorImg: randomImage(),
      postID: "vue-js-is-great-too",
      title: "Vue JS is great too",
      previewContent:
        "I figured, what if I could just extract the part that I really liked about React and build something really lightweight without all the extra concepts involved?",
      tags: ["vuejs"],
      featuredImg: randomImage(),
      createAt: howLongAgo(Date.now() - 2000000),
      likes: 70,
      comments: 30,
    },
    {
      authorID: "gaeron",
      authorName: "Dan Abramov",
      authorImg: randomImage(),
      postID: "reactjs-is-great",
      title: "ReactJS is great!",
      previewContent: "ReactJS is great!",
      tags: ["reactjs"],
      featuredImg: randomImage(),
      createAt: howLongAgo(Date.now() - 1003000),
      likes: 40,
      comments: 30,
    },
  ],
  posts: [
    {
      title: "CCS Tricks",
      content: "CSS grid is cool!",
      tags: ["css", "frontend"],
      featuredImg: randomImage(),
      createAt: howLongAgo(Date.now() - 2005000),
      likes: 19,
      comments: [
        {
          authorID: "evan_you",
          authorName: "Evan You",
          authorImg: randomImage(),
          comment: "Great article!",
          createAt: howLongAgo(Date.now() - 2000000),
        },
        {
          authorID: "gaeron",
          authorName: "Dan Abramov",
          authorImg: randomImage(),
          comment: "Cool!",
          createAt: howLongAgo(Date.now() - 1500000),
        },
      ],
    },
    {
      title: "Vue JS is great too, check it out",
      content:
        "I figured, what if I could just extract the part that I really liked about React and build something really lightweight without all the extra concepts involved? I was also curious as to how its internal implementation worked. I started this experiment just trying to replicate this minimal feature set, like declarative data binding. That was basically how Vue started.",
      tags: ["vue js"],
      featuredImg: randomImage(),
      createAt: howLongAgo(Date.now() - 1202000),
      likes: 89,
      comments: [
        {
          authorID: "evan_you",
          authorName: "Evan You",
          authorImg: randomImage(),
          comment: "Great article!",
          createAt: howLongAgo(Date.now() - 1200000),
        },
        {
          authorID: "gaeron",
          authorName: "Dan Abramov",
          authorImg: randomImage(),
          comment: "Cool!",
          createAt: howLongAgo(Date.now() - 2500000),
        },
      ],
    },
  ],
  videos: [], //a video post
  groups: [
    {
      groupID: "programmers-in-vancouver",
      name: "Programmers in Vancouver",
    },
    {
      groupID: "vannila-javaScript-lovers",
      name: "Vannila JavaScript Lovers",
    },
  ],
  currentViewedProfile: {
    //current public profile being viewed by user
    userID: "gaeron",
    name: "Dan Abramov",
    profilePic: randomImage(),
    backgroundImg: randomBackgroundImage(),
    status: "did not create ReactJS",
    followers: 120,
    posts: 20,
  },
  currentViewedPost: {
    authorID: "nick_lee",
    authorName: "Nick Lee",
    authorImg: randomImage(),
    postID: "vue-js-is-great-too",
    title: "Vue JS is great too",
    previewContent:
      "I figured, what if I could just extract the part that I really liked about React and build something really lightweight without all the extra concepts involved?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id velit eu mi egestas ornare. Proin ac velit quam. Nulla et nisi tellus. Etiam sodales nisi a ex accumsan aliquam at vitae lectus. In hac habitasse platea dictumst. In sit amet urna nec enim ultricies egestas eu at ipsum. Mauris luctus id velit eget rhoncus. Praesent eget consequat est. Nulla velit tellus, posuere in tortor ut, dapibus ornare augue. Sed fringilla libero eu commodo fermentum. Suspendisse non dolor vulputate, lobortis nulla eget, suscipit ipsum. Quisque nec nulla ac dui vehicula fringilla in non mi. Duis id vehicula libero. Morbi eget neque dignissim, sodales arcu sed, posuere arcu. Suspendisse fringilla, nulla ac accumsan dapibus, neque turpis dignissim massa, vitae efficitur neque urna non eros. Fusce blandit rhoncus mauris, ac aliquet purus consectetur ac. Suspendisse fermentum dictum turpis, vitae semper turpis. Suspendisse placerat magna eget ipsum tincidunt semper. Sed magna elit, tincidunt sit amet sapien at, auctor convallis diam. Morbi congue nisl lectus, quis dictum velit mattis ut. Ut eu tincidunt urna. Donec eu sem nec purus accumsan bibendum vel in diam. Mauris convallis tincidunt neque quis congue. Praesent a augue viverra, faucibus eros vel, vulputate est. Phasellus pharetra lorem et turpis varius egestas. Nullam in rhoncus massa. Aenean ac elit massa. Maecenas eleifend placerat turpis in malesuada. Nulla lacinia velit et libero dignissim tempor. Ut ullamcorper leo non euismod fermentum. Maecenas sodales, nibh vitae tincidunt lobortis, erat urna tincidunt neque, nec accumsan urna augue id nibh. Etiam consequat lorem non augue interdum, a gravida risus egestas. Sed odio eros, ultrices id odio nec, iaculis lacinia magna. Proin id leo sed libero scelerisque mattis at a magna. Morbi quis libero fermentum, scelerisque velit pulvinar, interdum turpis.",
    tags: ["vuejs"],
    featuredImg: randomBackgroundImage(),
    createAt: howLongAgo(Date.now() - 4000000),
    likes: 70,
    comments: [
      {
        authorID: "evan_you",
        authorName: "Evan You",
        authorImg: randomImage(),
        comment: "Great article!",
        createAt: howLongAgo(Date.now() - 1000000),
      },
      {
        authorID: "gaeron",
        authorName: "Dan Abramov",
        authorImg: randomImage(),
        comment: "Cool!",
        createAt: howLongAgo(Date.now() - 5000000),
      },
    ],
  },
  savedPosts: [
    {
      authorID: "gaeron",
      authorName: "Dan Abramov",
      authorImg: randomImage(),
      postID: "reactjs-is-great",
      title: "ReactJS is great!",
      createAt: howLongAgo(Date.now() - 1003000),
      likes: 40,
      comments: 30,
    },
    {
      authorID: "evan-you",
      authorName: "Evan You",
      authorImg: randomImage(),
      postID: "vue-js-is-great-too",
      title: "VueJS is great too",
      createAt: howLongAgo(Date.now() - 4000000),
      likes: 40,
      comments: 30,
    },
  ],
};
export type RootState = typeof initialData;
export type User = typeof initialData.user;
export type Group = typeof initialData.groups[0];
export type TrendingPost = typeof initialData.trendingPosts[0];
export type CurrentViewedPost = typeof initialData.currentViewedPost;
export type CurrentViewedProfile = typeof initialData.currentViewedProfile;
export type Post = typeof initialData.posts[0];

export default initialData;
