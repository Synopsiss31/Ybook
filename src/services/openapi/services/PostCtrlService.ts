/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateComment } from '../models/CreateComment';
import type { PostCreation } from '../models/PostCreation';
import type { UpdateComment } from '../models/UpdateComment';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostCtrlService {

    /**
     * Create a new post
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlCreate(
requestBody?: PostCreation,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rest/post/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Gets all the friends posts
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlReadAll(
requestBody?: any,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rest/post/read',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Updates a post
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlUpdatePost(
requestBody?: any,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rest/post/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Creates a like on a post, the user that likes is the one found in the token from cognito
     * @param idPost 
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlCreateLike(
idPost: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/post/like/create/{idPost}',
            path: {
                'idPost': idPost,
            },
        });
    }

    /**
     * Deletes a like on a post, the user user is the one found in the token from cognito
     * @param idPost 
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlDeleteLike(
idPost: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/post/like/delete/{idPost}',
            path: {
                'idPost': idPost,
            },
        });
    }

    /**
     * Creates a comment for a post
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlCreateComment(
requestBody?: CreateComment,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rest/post/comment/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Updates a comment for a post
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlUpdateComment(
requestBody?: UpdateComment,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rest/post/comment/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Deletes a comment for a post
     * @param idComment 
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlDeleteComment(
idComment: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/post/comment/delete/{idComment}',
            path: {
                'idComment': idComment,
            },
        });
    }

    /**
     * Gets the likes of a post
     * @param idPost 
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlGetLikes(
idPost: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/post/like/{idPost}',
            path: {
                'idPost': idPost,
            },
        });
    }

    /**
     * Gets the comments of a post
     * @param idPost 
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlGetComments(
idPost: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/post/comment/{idPost}',
            path: {
                'idPost': idPost,
            },
        });
    }

}
