/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCreation } from '../models/UserCreation';
import type { UserUpdate } from '../models/UserUpdate';

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
     * Get all the users
     * @returns any Success
     * @throws ApiError
     */
    public static userCtrlReadAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/users/read',
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
     * Patches the current user
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static userCtrlUdpateCurrentUser(
requestBody?: UserUpdate,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/rest/users/me',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
