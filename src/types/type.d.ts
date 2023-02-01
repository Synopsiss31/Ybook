import type { CognitoUser } from 'amazon-cognito-identity-js';

type TCognitoUserInfo = CognitoUser | null;

interface CognitoUserInfo extends TCognitoUserInfo {
  token?: string;
}
