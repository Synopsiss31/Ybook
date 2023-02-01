/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetSigned } from '../models/GetSigned';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ImageCtrlService {

    /**
     * Gets a S3 post pre signed URL
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static imageCtrlGetPostUrl(
requestBody?: GetSigned,
    ): CancelablePromise<any> {
      
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rest/image/url',
            body: requestBody,
          mediaType: 'application/json',
            
        });
    }

    /**
     * Gets a S3 pre signed url to get an object
     * @param s3Key 
     * @returns any Success
     * @throws ApiError
     */
    public static imageCtrlGetUrl(
s3Key: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rest/image/url/{s3Key}',
            path: {
                's3Key': s3Key,
            },
        });
    }

}
