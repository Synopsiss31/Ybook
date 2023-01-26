/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostCreation } from '../models/PostCreation';

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
            method: 'GET',
            url: '/rest/post/read',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Gets a S3 post pre signed URL
     * @returns any Success
     * @throws ApiError
     */
    public static postCtrlGetUrl(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/post/url',
        });
    }

}
