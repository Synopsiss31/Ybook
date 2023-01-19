import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  ISignUpResult,
} from "amazon-cognito-identity-js";

import type {ISession} from '../contexts/SessionCtx'

  const getUserPool = () =>
    new CognitoUserPool({
      UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
      ClientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    });

  const getUserAttributes = (user: CognitoUser) => {
    return user.getUserAttributes((err: any, result: any) => {
      if (err) {
        console.log(err);
        return;
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
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("session validity: " + session.isValid());
      });

      const token = cognitoUser.getSignInUserSession()?.getRefreshToken();
      if (!token) return;
      // refresh session
      cognitoUser.refreshSession(token, (err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        localStorage.setItem("token", session.getIdToken().getJwtToken());
        localStorage.setItem(
          "refreshToken",
          session.getRefreshToken().getToken()
        );

        console.log("session validity: " + session.isValid());
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
    };
    throw new Error("No user found");
  };

  const getAccessToken = () => {
    const cognitoUser = getCognitoUser();
    if (cognitoUser) {
      return new Promise<string>((resolve, reject) => {
        cognitoUser.getSession((err : Error | null, session : CognitoUserSession | null) => {
          if (err) {
            reject(err);
          }
          resolve(session!.getAccessToken().getJwtToken());
        });
      }
      );
    }
    throw new Error("No user found");
  };

  const getIsSessionValid = () => {
    const cognitoUser = getCognitoUser();
    if (cognitoUser) {
      const session = cognitoUser.getSignInUserSession();
      if (!session) return;
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
        throw new Error("No user found");
  };


  const logout = () => {
    const cognitoUser = getCognitoUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
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
          console.log("access token + " + result.getAccessToken().getJwtToken());
          console.log("id token + " + result.getIdToken().getJwtToken());
          console.log("refresh token + " + result.getRefreshToken().getToken());
          localStorage.setItem("token", result.getIdToken().getJwtToken());
          localStorage.setItem(
            "refreshToken",
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
      Name: "name",
      Value: name,
    };

    const dataGivenName = {
      Name: "given_name",
      Value: given_name,
    };

    const dataEmail = {
      Name: "email",
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
    console.log("resetPassword");
    const userPool = getUserPool();
    console.log(userPool);
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
            prompt("Please input verification code", "") || "";
          const newPassword = prompt("Enter new password", "") || "";
          cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess() {
              resolve("Password confirmed!");
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
          resolve(
            { ...session, username: cognitoUser.getUsername()}
          );
        });
      });
    }
    return Promise.reject("No current user");
  };


  export {
    getUserPool,
    getUserAttributes,
    getCognitoUser,
    verifySession,
    logout,
    login,
    signUp,
    confirmSignUp,
    resendConfirmationCode,
    resetPasswordSentCode,
    resetPasswordConfirm,
    resetPasswordPrompt,
    getAccessToken,
    getRefreshToken,
    getIsSessionValid,
    getCurrentSession,
    getIdToken
  };


export type { ISession };