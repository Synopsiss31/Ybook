import type {
  CognitoUserSession,
  ISignUpResult,
} from 'amazon-cognito-identity-js';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

import type { ISession } from '../contexts/SessionCtx';

const getUserPool = () =>
  new CognitoUserPool({
    UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
  });

const getUserAttributes = (user: CognitoUser) => {
  return user.getUserAttributes((err: any, result: any) => {
    if (err) {
      return null;
    }
    return result;
  });
};

const getCognitoUser = () => {
  const userPool = getUserPool();
  return userPool.getCurrentUser();
};

const verifySession = () => {
  const cognitoUser = getCognitoUser();
  if (cognitoUser) {
    cognitoUser.getSession((err: any) => {
      if (err) {
        return null;
      }
      return cognitoUser;
    });

    const token = cognitoUser.getSignInUserSession()?.getRefreshToken();
    if (!token) return;
    // refresh session
    cognitoUser.refreshSession(token, (err, session) => {
      if (err) {
        return null;
      }
      localStorage.setItem('token', session.getIdToken().getJwtToken());
      localStorage.setItem(
        'refreshToken',
        session.getRefreshToken().getToken()
      );

      return session;
    });
  }
};

const getIdToken = () => {
  const cognitoUser = getCognitoUser();
  if (cognitoUser) {
    return new Promise<string>((resolve, reject) => {
      cognitoUser.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
          }
          resolve(session!.getIdToken().getJwtToken());
        }
      );
    });
  }
  throw new Error('No user found');
};

const getAccessToken = () => {
  const cognitoUser = getCognitoUser();
  if (cognitoUser) {
    return new Promise<string>((resolve, reject) => {
      cognitoUser.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
          }
          resolve(session!.getAccessToken().getJwtToken());
        }
      );
    });
  }
  throw new Error('No user found');
};

const getIsSessionValid = () => {
  const cognitoUser = getCognitoUser();
  if (cognitoUser) {
    const session = cognitoUser.getSignInUserSession();
    if (!session) return false;
    return session.isValid();
  }
  return false;
};

const getRefreshToken = () => {
  const cognitoUser = getCognitoUser();
  if (cognitoUser) {
    return new Promise<string>((resolve, reject) => {
      cognitoUser.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
          }
          resolve(session!.getRefreshToken().getToken());
        }
      );
    });
  }
  throw new Error('No user found');
};

const logout = () => {
  const cognitoUser = getCognitoUser();
  if (cognitoUser) {
    cognitoUser.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
};

const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const userPool = getUserPool();
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        localStorage.setItem('token', result.getIdToken().getJwtToken());
        localStorage.setItem(
          'refreshToken',
          result.getRefreshToken().getToken()
        );
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

const signUp = ({
  name,
  given_name,
  password,
  email,
}: {
  name: string;
  given_name: string;
  password: string;
  email: string;
}) => {
  const userPool = getUserPool();
  const attributeList: CognitoUserAttribute[] = [];
  const dataName = {
    Name: 'name',
    Value: name,
  };

  const dataGivenName = {
    Name: 'given_name',
    Value: given_name,
  };

  const dataEmail = {
    Name: 'email',
    Value: email,
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributeName = new CognitoUserAttribute(dataName);
  const attributeGivenName = new CognitoUserAttribute(dataGivenName);
  attributeList.push(attributeEmail);
  attributeList.push(attributeName);
  attributeList.push(attributeGivenName);

  return new Promise((resolve, reject) => {
    userPool.signUp(
      email,
      password,
      attributeList,
      [],
      (err, result?: ISignUpResult) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
};

const confirmSignUp = ({
  username,
  code,
}: {
  username: string;
  code: string;
}) => {
  const userPool = getUserPool();
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const resendConfirmationCode = ({ username }: { username: string }) => {
  const userPool = getUserPool();
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const resetPasswordSentCode = ({ username }: { username: string }) => {
  const userPool = getUserPool();
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

const resetPasswordConfirm = ({
  username,
  code,
  password,
}: {
  username: string;
  code: string;
  password: string;
}) => {
  const userPool = getUserPool();
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(code, password, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

const resetPasswordPrompt = ({ username }: { username: string }) => {
  const userPool = getUserPool();
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
      inputVerificationCode() {
        const verificationCode =
          // eslint-disable-next-line no-alert
          prompt('Please input verification code', '') || '';
        // eslint-disable-next-line no-alert
        const newPassword = prompt('Enter new password', '') || '';
        cognitoUser.confirmPassword(verificationCode, newPassword, {
          onSuccess() {
            resolve('Password confirmed!');
          },
          onFailure(err) {
            reject(err);
          },
        });
      },
    });
  });
};

const getCurrentSession = () => {
  const userPool = getUserPool();
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    return new Promise<ISession>((resolve, reject) => {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          reject(err);
          return;
        }
        /* get User from DB */
        resolve({ ...session, username: cognitoUser.getUsername() });
      });
    });
  }
  return Promise.reject(new Error('No current user'));
};

export {
  confirmSignUp,
  getAccessToken,
  getCognitoUser,
  getCurrentSession,
  getIdToken,
  getIsSessionValid,
  getRefreshToken,
  getUserAttributes,
  getUserPool,
  login,
  logout,
  resendConfirmationCode,
  resetPasswordConfirm,
  resetPasswordPrompt,
  resetPasswordSentCode,
  signUp,
  verifySession,
};

export type { ISession };
