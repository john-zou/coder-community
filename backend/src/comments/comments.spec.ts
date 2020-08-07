import {drop, MockMongo} from '../util/mock-mongo';
import {CommentModel, PostModel, UserModel} from '../mongoModels';
import {CommentRoot} from './comment.schema';
import {createTestPost, createTestUser} from '../util/mongo-test-helpers';
import {
    commentIDsToCommentDtoArr,
    createComment,
    deleteComment,
    fetchAuthorsForComments,
    likeComment,
} from './comments.helpers';
import {WsException} from '@nestjs/websockets';
import {CreateCommentInvalidPostErrorString, CreateCommentServerToClientDto} from './dto/createComment.ws.dto';
import {isDocument, isRefType} from '@typegoose/typegoose';
import {DeleteCommentInvalidUserErrorString} from './dto/deleteComment.ws.dto';

describe('Comments Helper Functions', () => {

    beforeAll(MockMongo);
    afterAll(MockMongo);
    afterEach(() => drop(UserModel, PostModel, CommentModel));

    it('commentIDsToCommentDtoArr', async () => {
        const user = await createTestUser();
        const post = await createTestPost(user);
        const comment = new CommentModel();
        comment.author = user;
        comment.commentRoot = CommentRoot.POST;
        comment.parentPost = post;
        comment.content = 'Test';
        await comment.save();

        const actualArr = await commentIDsToCommentDtoArr([comment._id]);
        expect(actualArr).toHaveLength(1);
        const actual = actualArr[0];
        expect(actual._id).toBe(comment._id.toString());
        expect(actual.author).toBe(user._id.toString());
        expect(actual.content).toBe(comment.content);
        expect(actual.parentPost).toBe(post._id.toString());
        expect(actual.commentRoot).toBe(CommentRoot.POST.toString());
        expect(typeof actual.createdAt).toBe('number');
        expect(actual.createdAt).toBe(comment.createdAt.valueOf());
    });

    it('fetchAuthorsForComments', async () => {
        const user = await createTestUser();
        const actualArr = await fetchAuthorsForComments({[user._id.toString()]: true});
        expect(actualArr).toHaveLength(1);
        const actual = actualArr[0];
        expect(actual._id).toBe(user._id.toString());
        expect(actual.name).toBe(user.name);
        expect(actual.userID).toBe(user.userID);
    });

    it('createComment -- invalid post ID', async () => {
        const postAuthor = await createTestUser();
        const post = await createTestPost(postAuthor);
        const postID = post._id.toString();
        await PostModel.deleteOne({_id: post._id}); // delete the post so it's no longer valid
        let err;
        try {
            await createComment(postAuthor._id.toString(), {
                commentRoot: CommentRoot.POST.toString(),
                content: "test content",
                parentPost: postID
            });
        } catch (error) {
            err = error;
        }
        expect(err).toEqual(new WsException(CreateCommentInvalidPostErrorString));
        const comments = await CommentModel.find();
        expect(comments).toHaveLength(0);
    });

    it('createComment reply to a post', async () => {
        const postAuthor = await createTestUser();
        const post = await createTestPost(postAuthor);
        const postID = post._id.toString();
        const actual = await createComment(postAuthor._id.toString(), {
            commentRoot: CommentRoot.POST.toString(),
            content: "test content",
            parentPost: postID
        });
        const comments = await CommentModel.find();
        expect(comments).toHaveLength(1);
        const commentDocument = comments[0];
        expect(commentDocument.likes).toEqual(0);
        expect(commentDocument.content).toEqual("test content");
        expect(commentDocument.commentRoot).toEqual(CommentRoot.POST);
        expect(commentDocument.author).toEqual(postAuthor._id);

        // re-find post
        const refoundPost = (await PostModel.find())[0];
        expect(refoundPost.comments).toHaveLength(1);
        let postChildComment = refoundPost.comments[0];
        if (isDocument(postChildComment)) {
            expect(postChildComment._id).toEqual(commentDocument._id);
        } else if (isRefType(postChildComment)) {
            expect(postChildComment).toEqual(commentDocument._id);
        }

        // re-find author
        const refoundAuthor = (await UserModel.find())[0];
        expect(refoundAuthor.comments).toHaveLength(1);
        postChildComment = refoundAuthor.comments[0];
        if (isDocument(postChildComment)) {
            expect(postChildComment._id).toEqual(commentDocument._id);
        } else if (isRefType(postChildComment)) {
            expect(postChildComment).toEqual(commentDocument._id);
        }

        const expected: CreateCommentServerToClientDto = {
            comment: {
                _id: commentDocument._id.toString(),
                author: postAuthor._id.toString(),
                commentRoot: CommentRoot.POST.toString(),
                content: "test content",
                parentPost: postID,
                createdAt: commentDocument.createdAt.valueOf(),
                likes: 0,
            }
        }
        expect(actual).toEqual(expected);
    });

    it('createComment reply to a comment of a post', async () => {
        const postAuthor = await createTestUser();
        const post = await createTestPost(postAuthor);
        const postID = post._id.toString();
        const parentCommentDto = await createComment(postAuthor._id.toString(), {
            commentRoot: CommentRoot.POST.toString(),
            content: "test content",
            parentPost: postID
        });
        const childCommentDto = await createComment(postAuthor._id.toString(), {
            commentRoot: CommentRoot.POST.toString(),
            content: "test content",
            parentComment: parentCommentDto.comment._id,
            parentPost: postID
        });

        const refoundPost = (await PostModel.find())[0];
        const refoundAuthor = (await UserModel.find())[0];
        const refoundParentComment = await CommentModel.findById(parentCommentDto.comment._id);
        const refoundChildComment = await CommentModel.findById(childCommentDto.comment._id);

        expect(refoundPost.comments).toHaveLength(2);
        expect(refoundAuthor.comments).toHaveLength(2);
        expect(refoundParentComment.replies).toHaveLength(1);
        expect(refoundChildComment.replies).toHaveLength(0);

        expect(refoundChildComment.parentPost.toString()).toEqual(refoundPost._id.toString());
        expect(refoundChildComment.parentComment.toString()).toEqual(refoundParentComment._id.toString());
    });

    it('deleteComment deletes the replies too', async () => {
        const postAuthor = await createTestUser();
        const post = await createTestPost(postAuthor);
        const postID = post._id.toString();
        const parentCommentDto = await createComment(postAuthor._id.toString(), {
            commentRoot: CommentRoot.POST.toString(),
            content: "test content",
            parentPost: postID
        });
        const childCommentDto = await createComment(postAuthor._id.toString(), {
            commentRoot: CommentRoot.POST.toString(),
            content: "test content",
            parentComment: parentCommentDto.comment._id,
            parentPost: postID
        });

        const dto = await deleteComment(postAuthor._id.toString(), {commentID: parentCommentDto.comment._id});

        const refoundPost = (await PostModel.find())[0];
        const refoundAuthor = (await UserModel.find())[0];
        const refoundComments = await CommentModel.find();

        expect(refoundPost.comments).toHaveLength(0);
        expect(refoundAuthor.comments).toHaveLength(0);
        expect(refoundComments).toHaveLength(0);
        expect(dto).toEqual({deleted: true});
    });

    it('deleteComment -- invalid when user is not the author', async () => {
        const postAuthor = await createTestUser();
        const post = await createTestPost(postAuthor);
        const postID = post._id.toString();
        const parentCommentDto = await createComment(postAuthor._id.toString(), {
            commentRoot: CommentRoot.POST.toString(),
            content: "test content",
            parentPost: postID
        });
        const commentID = parentCommentDto.comment._id;
        const differentUser = await createTestUser('diff', 'diff', 2);

        let err;
        try {
            await deleteComment(differentUser._id.toString(), {commentID});
        } catch (error) {
            err = error;
        }
        expect(err).toEqual(new WsException(DeleteCommentInvalidUserErrorString));
    })

    it('likeComment -- happy path', async () => {
        const postAuthor = await createTestUser();
        const post = await createTestPost(postAuthor);
        const postID = post._id.toString();
        const comment = await createComment(postAuthor._id.toString(), {
            commentRoot: CommentRoot.POST.toString(),
            content: "test content",
            parentPost: postID
        });
        await likeComment(postAuthor._id.toString(), {commentID: comment.comment._id});
    });

});
