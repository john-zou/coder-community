/**
 * Coder Community
 * The Coder Community API description
 *
 * OpenAPI spec version: 0.0.2
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as api from "./api"
import { Configuration } from "./configuration"

const config: Configuration = {}

describe("AuthApi", () => {
  let instance: api.AuthApi
  beforeEach(function() {
    instance = new api.AuthApi(config)
  });

  test("authControllerLogOut", () => {
    const body: api.LogOut = undefined
    return expect(instance.authControllerLogOut(body, {})).resolves.toBe(null)
  })
  test("authControllerLoginGitHub", () => {
    const body: api.GitHubLoginBody = undefined
    return expect(instance.authControllerLoginGitHub(body, {})).resolves.toBe(null)
  })
  test("authControllerLoginGoogle", () => {
    const body: api.GoogleLoginBody = undefined
    return expect(instance.authControllerLoginGoogle(body, {})).resolves.toBe(null)
  })
})

describe("ConversationsApi", () => {
  let instance: api.ConversationsApi
  beforeEach(function() {
    instance = new api.ConversationsApi(config)
  });

  test("conversationsControllerCreateConversation", () => {
    const body: api.CreateConversationBodyDto = undefined
    return expect(instance.conversationsControllerCreateConversation(body, {})).resolves.toBe(null)
  })
})

describe("DefaultApi", () => {
  let instance: api.DefaultApi
  beforeEach(function() {
    instance = new api.DefaultApi(config)
  });

  test("appControllerGetHello", () => {
    return expect(instance.appControllerGetHello({})).resolves.toBe(null)
  })
})

describe("DevApi", () => {
  let instance: api.DevApi
  beforeEach(function() {
    instance = new api.DevApi(config)
  });

  test("devControllerCreateCustomUser", () => {
    const body: api.CreateCustomUser = undefined
    return expect(instance.devControllerCreateCustomUser(body, {})).resolves.toBe(null)
  })
  test("devControllerCreatePostDev", () => {
    return expect(instance.devControllerCreatePostDev({})).resolves.toBe(null)
  })
  test("devControllerGetJwt", () => {
    const id: string = "id_example"
    return expect(instance.devControllerGetJwt(id, {})).resolves.toBe(null)
  })
  test("devControllerLoginDev", () => {
    return expect(instance.devControllerLoginDev({})).resolves.toBe(null)
  })
  test("devControllerMarco", () => {
    return expect(instance.devControllerMarco({})).resolves.toBe(null)
  })
  test("devControllerMarcoPersonal", () => {
    return expect(instance.devControllerMarcoPersonal({})).resolves.toBe(null)
  })
})

describe("DiscussionsApi", () => {
  let instance: api.DiscussionsApi
  beforeEach(function() {
    instance = new api.DiscussionsApi(config)
  });

  test("discussionsControllerCreateDiscussion", () => {
    const body: api.CreateDiscussionDto = undefined
    return expect(instance.discussionsControllerCreateDiscussion(body, {})).resolves.toBe(null)
  })
  test("discussionsControllerGetDiscussionById", () => {
    const id: string = "id_example"
    return expect(instance.discussionsControllerGetDiscussionById(id, {})).resolves.toBe(null)
  })
  test("discussionsControllerGetDiscussionsByQuestionID", () => {
    const id: string = "id_example"
    return expect(instance.discussionsControllerGetDiscussionsByQuestionID(id, {})).resolves.toBe(null)
  })
})

describe("GroupsApi", () => {
  let instance: api.GroupsApi
  beforeEach(function() {
    instance = new api.GroupsApi(config)
  });

  test("groupsControllerCreateGroup", () => {
    const body: api.CreateGroupDto = undefined
    return expect(instance.groupsControllerCreateGroup(body, {})).resolves.toBe(null)
  })
  test("groupsControllerGetGroups", () => {
    return expect(instance.groupsControllerGetGroups({})).resolves.toBe(null)
  })
  test("groupsControllerGetMembersAndPosts", () => {
    const groupID: string = "groupID_example"
    return expect(instance.groupsControllerGetMembersAndPosts(groupID, {})).resolves.toBe(null)
  })
  test("groupsControllerGetPrivateGroup", () => {
    const privateId: string = "privateId_example"
    return expect(instance.groupsControllerGetPrivateGroup(privateId, {})).resolves.toBe(null)
  })
  test("groupsControllerGetPublicGroup", () => {
    const id: string = "id_example"
    return expect(instance.groupsControllerGetPublicGroup(id, {})).resolves.toBe(null)
  })
  test("groupsControllerJoinGroup", () => {
    const id: string = "id_example"
    return expect(instance.groupsControllerJoinGroup(id, {})).resolves.toBe(null)
  })
  test("groupsControllerLeaveGroup", () => {
    const id: string = "id_example"
    return expect(instance.groupsControllerLeaveGroup(id, {})).resolves.toBe(null)
  })
})

describe("MessagesApi", () => {
  let instance: api.MessagesApi
  beforeEach(function() {
    instance = new api.MessagesApi(config)
  });

  test("messagesControllerCreateMessage", () => {
    const body: api.CreateMessageBodyDto = undefined
    const conversationID: string = "conversationID_example"
    return expect(instance.messagesControllerCreateMessage(body, conversationID, {})).resolves.toBe(null)
  })
  test("messagesControllerGetMessagesInConversation", () => {
    const conversationID: string = "conversationID_example"
    return expect(instance.messagesControllerGetMessagesInConversation(conversationID, {})).resolves.toBe(null)
  })
})

describe("PostsApi", () => {
  let instance: api.PostsApi
  beforeEach(function() {
    instance = new api.PostsApi(config)
  });

  test("postsControllerCreatePost", () => {
    const body: api.CreatePostBodyDto = undefined
    return expect(instance.postsControllerCreatePost(body, {})).resolves.toBe(null)
  })
  test("postsControllerDeletePostByPostID", () => {
    const postID: string = "postID_example"
    return expect(instance.postsControllerDeletePostByPostID(postID, {})).resolves.toBe(null)
  })
  test("postsControllerGetPostByID", () => {
    const postID: string = "postID_example"
    const getAuthor: boolean = true
    return expect(instance.postsControllerGetPostByID(postID, getAuthor, {})).resolves.toBe(null)
  })
  test("postsControllerGetPostBySlug", () => {
    const slug: string = "slug_example"
    const getAuthor: boolean = true
    return expect(instance.postsControllerGetPostBySlug(slug, getAuthor, {})).resolves.toBe(null)
  })
  test("postsControllerGetPostsByUserID", () => {
    const userID: string = "userID_example"
    return expect(instance.postsControllerGetPostsByUserID(userID, {})).resolves.toBe(null)
  })
  test("postsControllerIncrementView", () => {
    const postID: string = "postID_example"
    return expect(instance.postsControllerIncrementView(postID, {})).resolves.toBe(null)
  })
  test("postsControllerLikePost", () => {
    const postID: string = "postID_example"
    return expect(instance.postsControllerLikePost(postID, {})).resolves.toBe(null)
  })
  test("postsControllerUnlikePost", () => {
    const postID: string = "postID_example"
    return expect(instance.postsControllerUnlikePost(postID, {})).resolves.toBe(null)
  })
  test("postsControllerUpdatePostBySlug", () => {
    const body: api.UpdatePostBodyDto = undefined
    const slug: string = "slug_example"
    return expect(instance.postsControllerUpdatePostBySlug(body, slug, {})).resolves.toBe(null)
  })
  test("tagsControllerGetPostsByTag", () => {
    const tagID: string = "tagID_example"
    const requestedCount: number = 1.2
    const startIdx: number = 1.2
    const excludePostIDs: api.any = undefined
    return expect(instance.tagsControllerGetPostsByTag(tagID, requestedCount, startIdx, excludePostIDs, {})).resolves.toBe(null)
  })
})

describe("QuestionsApi", () => {
  let instance: api.QuestionsApi
  beforeEach(function() {
    instance = new api.QuestionsApi(config)
  });

  test("questionsControllerGetQuestions", () => {
    return expect(instance.questionsControllerGetQuestions({})).resolves.toBe(null)
  })
})

describe("SearchApi", () => {
  let instance: api.SearchApi
  beforeEach(function() {
    instance = new api.SearchApi(config)
  });

  test("searchControllerSearch", () => {
    const q: string = "q_example"
    return expect(instance.searchControllerSearch(q, {})).resolves.toBe(null)
  })
})

describe("TrendingApi", () => {
  let instance: api.TrendingApi
  beforeEach(function() {
    instance = new api.TrendingApi(config)
  });

  test("trendingControllerGetTrending", () => {
    const fetchCount: number = 1.2
    return expect(instance.trendingControllerGetTrending(fetchCount, {})).resolves.toBe(null)
  })
  test("trendingControllerGetTrendingLoggedIn", () => {
    const fetchCount: number = 1.2
    return expect(instance.trendingControllerGetTrendingLoggedIn(fetchCount, {})).resolves.toBe(null)
  })
})

describe("UploadApi", () => {
  let instance: api.UploadApi
  beforeEach(function() {
    instance = new api.UploadApi(config)
  });

  test("uploadControllerUploadPrivateFile", () => {
    return expect(instance.uploadControllerUploadPrivateFile({})).resolves.toBe(null)
  })
  test("uploadControllerUploadProfileBannerPic", () => {
    const body: api.FileUploadDto = undefined
    return expect(instance.uploadControllerUploadProfileBannerPic(body, {})).resolves.toBe(null)
  })
  test("uploadControllerUploadProfilePic", () => {
    const body: api.FileUploadDto = undefined
    return expect(instance.uploadControllerUploadProfilePic(body, {})).resolves.toBe(null)
  })
  test("uploadControllerUploadPublicAsset", () => {
    const body: api.FileUploadDto = undefined
    return expect(instance.uploadControllerUploadPublicAsset(body, {})).resolves.toBe(null)
  })
})

describe("UserApi", () => {
  let instance: api.UserApi
  beforeEach(function() {
    instance = new api.UserApi(config)
  });

  test("userControllerAddFollowing", () => {
    const id: string = "id_example"
    return expect(instance.userControllerAddFollowing(id, {})).resolves.toBe(null)
  })
  test("userControllerEditProfile", () => {
    const body: api.UpdateProfileReqDto = undefined
    return expect(instance.userControllerEditProfile(body, {})).resolves.toBe(null)
  })
  test("userControllerGetFollowingFollowersOfUser", () => {
    return expect(instance.userControllerGetFollowingFollowersOfUser({})).resolves.toBe(null)
  })
  test("userControllerGetUser", () => {
    return expect(instance.userControllerGetUser({})).resolves.toBe(null)
  })
  test("userControllerGetUserByUsername", () => {
    const username: string = "username_example"
    return expect(instance.userControllerGetUserByUsername(username, {})).resolves.toBe(null)
  })
  test("userControllerGetUsersByIDs", () => {
    const ids: string = "ids_example"
    return expect(instance.userControllerGetUsersByIDs(ids, {})).resolves.toBe(null)
  })
  test("userControllerRemoveFollowing", () => {
    const id: string = "id_example"
    return expect(instance.userControllerRemoveFollowing(id, {})).resolves.toBe(null)
  })
  test("userControllerSavePost", () => {
    const postID: string = "postID_example"
    return expect(instance.userControllerSavePost(postID, {})).resolves.toBe(null)
  })
})

describe("VideoApi", () => {
  let instance: api.VideoApi
  beforeEach(function() {
    instance = new api.VideoApi(config)
  });

  test("videoControllerCreateVideo", () => {
    const body: api.CreateVideoDto = undefined
    return expect(instance.videoControllerCreateVideo(body, {})).resolves.toBe(null)
  })
  test("videoControllerGetAllVideos", () => {
    return expect(instance.videoControllerGetAllVideos({})).resolves.toBe(null)
  })
})

