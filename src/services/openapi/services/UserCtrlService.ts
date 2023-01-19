/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCreation } from '../models/UserCreation';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserCtrlService {

    /**
     * Create a new user
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static userCtrlCreate(
requestBody?: UserCreation,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rest/users/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get the current user
     * @returns any Success
     * @throws ApiError
     */
    public static userCtrlGetCurrentUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/users/me',
        });
    }

    /**
     * Get all the filtered users
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static userCtrlReadFiltered(
requestBody?: any,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rest/users/read',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get one user
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static userCtrlReadOneFiltered(
requestBody?: any,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rest/users/readOne',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
