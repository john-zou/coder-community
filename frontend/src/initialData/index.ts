import { randomImage } from "../util/helpers";
const initialData = {
  users: [
    {
      _id: 0,
      name: "Nick Lee",
      pic: randomImage(),
      status: "work at Microsoft",
    },
    {
      _id: 1,
      name: "Evan You",
      pic: randomImage(),
      status: "student",
    },
    {
      _id: 2,
      name: "Dan Abramov",
      pic: randomImage(),
      status: "ReactJS newbie",
    },
  ],
  posts: [
    {
      _id: 0,
      authorID: 1,
      title: "CCS Tricks",
      content: "CSS grid is cool!",
      featuredImg: randomImage(),
      create_at: Date.parse("2020-05-02 5:55"),
      likes: 19,
      comments: [
        {
          authorID: 0,
          comment: "Great article!",
          timeStamp: Date.parse("2020-06-17 5:55"),
        },
        {
          authorID: 2,
          comment: "Cool!",
          timeStamp: Date.parse("2020-06-17 7:00"),
        },
      ],
    },
    {
      _id: 1,
      authorID: 0,
      title: "Vue JS is great too, check it out",
      content:
        "I figured, what if I could just extract the part that I really liked about React and build something really lightweight without all the extra concepts involved? I was also curious as to how its internal implementation worked. I started this experiment just trying to replicate this minimal feature set, like declarative data binding. That was basically how Vue started.",
      featuredImg: randomImage(),
      create_at: Date.parse("2020-05-07 8:08"),
      likes: 89,
      comments: [
        {
          authorID: 1,
          comment: "Amazing!",
          timeStamp: Date.parse("2020-06-14 6:55"),
        },
        {
          authorID: 2,
          comment: "Cool article!",
          timeStamp: Date.parse("2020-06-15 8:00"),
        },
      ],
    },
  ],
};

export default initialData;
