# Coder Community

### _Coder Community is a social platform for software developers of all levels. On Coder Community, you can join and grow with a community and read and write articles, post and watch videos, join and create groups, live chat, and undertake coding challenges together._

## Goals, Revisited:

### **3-5 minimal requirements**

- Login and authentication system (Done)
- Allow users to upload videos, pics, create, delete, update posts (Done)
- Create, join and leave groups (Done)
- Like and unlike posts (Done)

### **3-7 standard requirements**

- View posts by popularity (trending) and by tag (Done)
- Search system (Done)
- Following/followers system (Done)
- Comment system (Done)
- Let user have a "saved posts" reading list (Done)


### **2-3 stretch requirements**

- Real time messaging (Done)
- Code collaboration (Done)

## Units 1-5 technologies
- Unit 1: We use HTML, CSS, JS
- Unit 2: We use React and Redux (with Redux Toolkit)
- Unit 3: We use MongoDB for storing everything except for images (file storage instead) and code collab code (not stored), using Mongoose and Typegoose
- Unit 4: We use Node and Express for the back end (with NestJS framework)
- Unit 5: We have deployed the app on AWS EC2 with Docker at http://ec2-13-229-215-75.ap-southeast-1.compute.amazonaws.com/

## **Above and Beyond**

## **Code Together**: real time code collaboration
### From a DM chat or group chat, a code collaboration room can be created and an invitation link automatically sent to those in the chat
![image](https://user-images.githubusercontent.com/61474884/89673333-07c36d80-d89b-11ea-8597-e68fd0de43a8.png)

### Users in the code collaboration room will see each other's cursors and each other's code edits
![image](https://user-images.githubusercontent.com/61474884/89673617-815b5b80-d89b-11ea-9971-cfd1df1ee9bb.png)

![image](https://user-images.githubusercontent.com/61474884/89673660-96d08580-d89b-11ea-9dda-eea42ebd2b43.png)

- We implemented this using WebSockets, treating it as a live chat session, where messages are editor actions (cursor position, insert, deletions, replacements), and updating the editor based on other users' "messages". The server maintains a list of code

---

## Major accomplishment: real time messaging (using websockets)

![image](https://user-images.githubusercontent.com/61474884/88451384-335e4680-ce0b-11ea-87dc-727b307c87f1.png)



## **Next Steps**
- Improvements to be made:
  - A final major feature: extend **Code Together** to collaborative daily code challenges, with code execution and testing done by a standalone service, such as [DMOJ](https://github.com/DMOJ/online-judge)
  - Responsive layout: make every page mobile-friendly
  - Expose more of Visual Studio Code's functionality in the code collab editor, such as language options
  - Use a more robust solution for code collaboration that gracefully handles 'merge conflicts' that can result from poor connectivity etc
    - We looked into [Convergence server](https://github.com/convergencelabs/convergence-server), but it takes 5GB of RAM to run, which is 4GB over our AWS EC2 memory capacity.
  - Implement read-states for messages, and create a notifications/new messages system

- Performance / scalability improvements:
  - GraphQL: we used REST (HTTP endpoints) for the majority of our operations because using Express and REST was one of the requirements of the project. However, as a social network, we would benefit greatly by switching to GraphQL instead, which would also enable us to have more optimized mobile experiences.
  - Caching:
    - Front end: currently, we use our Redux store as a cache, only fetching posts that aren't in the store, with invalidation happening only on a page refresh. With a switch to GraphQL, we can use Apollo Client and the more advanced cache that comes with it, making a better user experience
  - Server-side rendering: as a social network app with many pages / front end routes, we would see much faster loading times by switching from Create React App, which is purely client side rending, to a server side rendernig solution such as NextJS


---

## **Contributions**

- Dara Nguyen:
  - Contributed massively in every aspect of the project, including most of the visual design
  - Trending posts (infinite scrolling), live chat, code collaboration, groups, etc

- Yang Yang (Mina):
  - Header bar, which is responsive
  - Video upload feature (this feature was merged into the custom post editor which allows embedding of videos)

- Zhuoting Xie (Fred):
  - Post creation
  - Post update

- John Zou:
  - Most of the back end (NestJS, authentication, WebSocket, OpenAPI, scripts to trigger code generation for end-to-end type safety, file upload/storage)
  - Live chat, code collaboration, comments system, profile, post details page, React Router, etc
  - Deployment
  
---

---

# Project Progress 5

## Major accomplishment: real time messaging (using websockets)

![image](https://user-images.githubusercontent.com/61474884/88451384-335e4680-ce0b-11ea-87dc-727b307c87f1.png)

## Daily Code Challenge (half done)

![image](https://user-images.githubusercontent.com/20777446/88452036-5c350a80-ce10-11ea-814f-c20a7629ceaa.png)

## Goals, Revisited:

### **3-5 minimal requirements**

- Login and authentication system (Done)
- Allow users to upload videos, pics, create, delete, update posts (Done)
- Create, join and leave groups (Done)
- Like and unlike posts (Done)

### **3-7 standard requirements**

- View posts by popularity (trending) and by tag (Done)
- Search system (Done)
- Following/followers system (Mostly done)\*
- Comment system (Done)
- Let user have a "saved posts" reading list (Mostly done)\*

| \*Only thing left is to finish front end components, will be done very soon

### **2-3 stretch requirements**

- Real time messaging (Done)
- Interactive coding tutorial (Half done)

## Deployed:
http://ec2-13-229-215-75.ap-southeast-1.compute.amazonaws.com/
AWS EC2 running Docker
Minor changes (Such as Dockerfile, made before 10:00AM deadline, on branch project_5_deploy)

---

---

---

# Project Progress 4

### _Use collections to store your data in MongoDB._

We are storing many collections in MongoDB:
![image](https://user-images.githubusercontent.com/61474884/87220200-c2049b00-c316-11ea-87b4-4054b5cdb04b.png)

### _Set up Node and Express to connect your React+Redux frontend with your Mongo DB_

![image](https://user-images.githubusercontent.com/61474884/87220257-24f63200-c317-11ea-9bd6-66527cc785eb.png)

### _Ensure that you are now retrieving your data from the database to display in your React components (at least one API)_

We retrieve the following information from various API endpoints:

- User
- Tags
- Posts
- Groups

### _Ensure that you have a type of input or form element that sends data to the database (at least one API)_

- Login (sends GitHub user info to database)
  ![image](https://user-images.githubusercontent.com/61474884/87220310-8a4a2300-c317-11ea-88e7-bf1fbab39638.png)
  ![image](https://user-images.githubusercontent.com/61474884/87220322-a4840100-c317-11ea-9f15-9d7f2080f913.png)

- Create Post
  ![image](https://user-images.githubusercontent.com/61474884/87220302-76062600-c317-11ea-849a-e8dda5c415ea.png)

- Create Group
  ![image](https://user-images.githubusercontent.com/61474884/87220425-65a27b00-c318-11ea-8880-65803f7f9e1b.png)

### _Implement EITHER update or delete (or both!) for your data in the database._

- Update Post (looks similar to create post)

## Other Accomplishments

- Trending posts infinite scroll. Fetches posts in order of decreasing popularity and freshness, while the user scrolls through the page.

- File upload and static image hosting of user content

- GitHub OAuth login and custom token-based authentication

- Users can create / join / leave groups

- Users can like / unlike posts

## Goals, Regrouped:

### **3-5 minimal requirements**

- Login and authentication system (Done)
- Allow users to upload videos, pics, create, delete, update posts (Mostly Done)
- Create, join and leave groups (Mostly Done)
- Like and unlike posts (Done)

### **3-7 standard requirements**

- View posts by popularity (trending) and by tag (Done)
- Search system (Not done)
- Following/followers system (Some done)
- Comment system (Not done)
- Let user have a "saved posts" reading list (Mostly done)

### **2-3 stretch requirements**

- Real time messaging (Not done)
- Interactive coding tutorial (Not done)

---

---

---

# Project Progress 3

## Completed Tasks:

## Put some default data for your “main” data in your reducer(s).

![image](https://user-images.githubusercontent.com/61474884/85080419-f48b0000-b17d-11ea-9209-df1d850de80c.png)

![image](https://user-images.githubusercontent.com/61474884/85080465-1c7a6380-b17e-11ea-8d2a-8a56f180b986.png)

## Connect the default data to at least one component in order to display it.

It has been connected to the component for the Home (`/`), Post (`/post/<post-id>`), and User (`u/<user-id>`) pages.

### Home:

![image](https://user-images.githubusercontent.com/61474884/85084780-ab8d7880-b18a-11ea-8f23-917764998751.png)

### Post:

![image](https://user-images.githubusercontent.com/61474884/85084804-b9db9480-b18a-11ea-86e9-b17d8013d996.png)

### User:

![image](https://user-images.githubusercontent.com/61474884/85084829-d081eb80-b18a-11ea-8074-ce022888b906.png)

## Create a minimum of 3 actions that manipulate your store.

![image](https://user-images.githubusercontent.com/61474884/85085023-6158c700-b18b-11ea-9b1a-313ba7da2981.png)

These are working on the pages above.

## Additionally, video upload page:

![image](https://user-images.githubusercontent.com/61474884/85196204-64d47700-b28d-11ea-832f-11bf5ef1b90c.png)

## Back end initial setup / repo structuring for full stack app:

![image](https://user-images.githubusercontent.com/61474884/85196229-9baa8d00-b28d-11ea-8deb-c6946474acb9.png)

---

---

# Project Progress 2

## Completed Tasks:

### A component structure of the app / at least 5 components:

![Diagram](deliverables/component_structure.png)

### A component for the main item (post) and styling / progress towards completing one of our minimal goals:

![Diagram](deliverables/components.png)

### Optional: Redux setup

![Diagram](deliverables/redux_setup.png)

### Additionally: React Router setup

![Diagram](deliverables/router_setup.png)

### Responsive Navbar

![Diagram](deliverables/responsive_navbar.png)
![Diagram](deliverables/responsive_navbar2.png)
![Diagram](deliverables/responsive_navbar3.png)

---

---

# Project: _Coder Community_ (tentative title)

![Diagram](sketches/Home.png)

CPSC 436i Summer 2020
Team: Team Red (tentative name)
Members:

- Dara Nguyen x3n1b
- Yang Yang c7x2b
- Zhuoting Xie k6y2b
- John Zou r6m2b

### Description

Targeting programmers or anyone who are interested in programming, **Coder Community** is a social network for programmers to connect with each other, share ideas, write articles.

- It will store user information, Social network (friends/followers), Blogs and associated items (comments, likes, images), video diary items (short videos, images, voice clips).
- Users will be able to:
  - Feel a sense of belonging
  - Self improvement (learning and staying up to date with latest technology)
  - Find friends and project partners
- Additionally, we hope to implement, based on time constraints:
  Real-time messaging, integration with other services such as automatic uploading to Youtube

### Project task requirements:

#### 3-5 minimal requirements (will definitely complete)

- Login and authentication system
- Allows users to upload videos, photos, pics, and create, delete, update posts
- Allows users to comment on other users’ blogs
- Implements server following RESTful principles with basic functions (including GET PUT POST DELETE) being supported.
- Connects to MongoDB and be able to store and retrieve user comments when requested.

#### 3-7 "standard" requirements (will most likely complete)

- Show posts in categories (tags) and popularity
- Create groups which people can join

- Supports user authentication using passport or other packages
- Deploys using heroku or other cloud services

#### 2-3 stretch requirements (plan to complete 1!)

- Allow user to upload interactive coding tutorial
- Real-time messaging (one-on-one and group chat)

### Pick 2 of your minimal requirements and break each of them down into ~2-5 smaller tasks!

#### (1) Create/edit/delete articles

- Create MongoDB schema for articles
- Write back end API service in NodeJS
- Create Web interface for creation/editing/deletion/viewing articles
- Integrate with login / authentication system

#### (2) Login and authentication system

- Create MongoDB schema for users/hashes
- Write back end API service in NodeJS
- Configure NodeJS middleware for authentication
- Create Web interface for login/registration

### More prototypes/sketches

https://www.figma.com/file/ehowTfq9OAMUdMf3Qbngi0/Programmers-Social-Network?node-id=0%3A1

#### Profile

![Diagram](sketches/View%20profile.png)

#### Create New Post

![Diagram](sketches/Create%20new%20post.png)

#### Post Detail

![Diagram](sketches/Post%20Detail.png)
