import { mongoose } from "@typegoose/typegoose"
import { UserModel } from "../src/user/user.schema";


const runScript = () => {
  mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "coderCommunityTest" })
  mongoose.connection.collections.users.drop();
  mongoose.connection.collections.posts.drop();
  insertUsers();
  insertPosts();
}
const insertUsers = () => {
  UserModel.insertMany([
    {
      "userID": "smcdonagh0",
      "gitHubID": "2249015309",
      "name": "Sharia McDonagh",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "porttitor id consequat in consequat ut nulla",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1567055601000",
      "createdAt": "1590726335000",
      "updatedAt": "1580978361000"
    },
    {
      "userID": "cpechacek1",
      "gitHubID": "3011026963",
      "name": "Casi Pechacek",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "consectetuer adipiscing elit",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1574241341000",
      "createdAt": "1573832156000",
      "updatedAt": "1571900309000"
    },
    {
      "userID": "rgeach2",
      "gitHubID": "9879128915",
      "name": "Roderick Geach",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "mauris eget massa tempor",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1590448433000",
      "createdAt": "1576676771000",
      "updatedAt": "1576372089000"
    },
    {
      "userID": "hdowbiggin3",
      "gitHubID": "8888099204",
      "name": "Herculie Dowbiggin",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "eget tempus vel pede morbi porttitor lorem id",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1582548867000",
      "createdAt": "1584404639000",
      "updatedAt": "1585209712000"
    },
    {
      "userID": "otal4",
      "gitHubID": "3917509512",
      "name": "Oliy Tal",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "nisl nunc nisl duis bibendum felis sed interdum venenatis turpis",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1590275860000",
      "createdAt": "1577821934000",
      "updatedAt": "1589907778000"
    },
    {
      "userID": "camyes5",
      "gitHubID": "0582946557",
      "name": "Catlin Amyes",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "quis turpis sed ante vivamus tortor duis mattis egestas",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1568949894000",
      "createdAt": "1571827148000",
      "updatedAt": "1593190094000"
    },
    {
      "userID": "cbussey6",
      "gitHubID": "1896441513",
      "name": "Cullin Bussey",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "vel augue vestibulum",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1589426847000",
      "createdAt": "1579381954000",
      "updatedAt": "1562707660000"
    },
    {
      "userID": "htournay7",
      "gitHubID": "6929879363",
      "name": "Harlin Tournay",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "at velit vivamus vel",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1592878003000",
      "createdAt": "1564989251000",
      "updatedAt": "1565827752000"
    },
    {
      "userID": "aleahy8",
      "gitHubID": "1746281286",
      "name": "Amandie Leahy",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "porta",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1562140144000",
      "createdAt": "1569481650000",
      "updatedAt": "1582482446000"
    },
    {
      "userID": "merb9",
      "gitHubID": "3662696398",
      "name": "May Erb",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "convallis duis consequat dui nec nisi volutpat eleifend donec",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1576176757000",
      "createdAt": "1567038027000",
      "updatedAt": "1575646101000"
    },
    {
      "userID": "gensleya",
      "gitHubID": "9602106174",
      "name": "Gabriell Ensley",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "congue diam id ornare imperdiet sapien urna pretium nisl",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1567973784000",
      "createdAt": "1585712910000",
      "updatedAt": "1588036395000"
    },
    {
      "userID": "smolyneuxb",
      "gitHubID": "1761490699",
      "name": "Shaina Molyneux",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "morbi vel lectus in",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1580196179000",
      "createdAt": "1586601342000",
      "updatedAt": "1578258097000"
    },
    {
      "userID": "jguessc",
      "gitHubID": "5766148526",
      "name": "Josey Guess",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "mattis egestas metus aenean",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1563766303000",
      "createdAt": "1583694013000",
      "updatedAt": "1581674013000"
    },
    {
      "userID": "lbennedickd",
      "gitHubID": "0529431149",
      "name": "Leonidas Bennedick",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "donec posuere metus vitae ipsum aliquam non mauris",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1576629041000",
      "createdAt": "1577206532000",
      "updatedAt": "1574745294000"
    },
    {
      "userID": "rzanucioliie",
      "gitHubID": "5635229875",
      "name": "Ruy Zanuciolii",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "nullam orci pede venenatis",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1589488496000",
      "createdAt": "1567684552000",
      "updatedAt": "1592363534000"
    },
    {
      "userID": "pdufallf",
      "gitHubID": "3547184347",
      "name": "Paule Dufall",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "tempus vel pede morbi porttitor lorem id ligula suspendisse ornare",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1575235102000",
      "createdAt": "1585967843000",
      "updatedAt": "1582200963000"
    },
    {
      "userID": "jyanceyg",
      "gitHubID": "7722122841",
      "name": "Johna Yancey",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "id turpis integer aliquet massa id lobortis convallis tortor risus",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1582303812000",
      "createdAt": "1588054855000",
      "updatedAt": "1577913513000"
    },
    {
      "userID": "lmcgeeh",
      "gitHubID": "2945244500",
      "name": "Luelle McGee",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "felis donec semper sapien a libero nam dui",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1571915925000",
      "createdAt": "1568969479000",
      "updatedAt": "1583100842000"
    },
    {
      "userID": "ddormeri",
      "gitHubID": "9380525354",
      "name": "Drew Dormer",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "venenatis turpis",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1570451294000",
      "createdAt": "1569939788000",
      "updatedAt": "1563113531000"
    },
    {
      "userID": "leffemyj",
      "gitHubID": "9714795516",
      "name": "Lawry Effemy",
      "profilePic": "https://picsum.photos/250",
      "backgroundImg": "https://picsum.photos/1400",
      "status": "nunc viverra",
      "followers": [],
      "followings": [],
      "groups": [],
      "savedPosts": [],
      "tags": [],
      "conversations": [],
      "lastLoggedIn": "1586409051000",
      "createdAt": "1574747877000",
      "updatedAt": "1592070310000"
    }
  ])
}
const insertPosts = () => {

}
runScript();

// export const randomImage = () => {
//   // get a random number from 200-350
//   const randomNumber = Math.floor(Math.random() * 150 + 200);
//   return `https://picsum.photos/${randomNumber}`;
// };

// export const randomBackgroundImage = () => {
//   // get a random number from 1000-1400
//   const randomNumber = Math.floor(Math.random() * 400 + 1000);
//   return `https://picsum.photos/${randomNumber}`;
// };