import { useSessionCtx } from '../contexts/SessionCtx';
import {
  confirmSignUp,
  getCurrentSession,
  login as loginUser,
  logout as logoutUser,
  resendConfirmationCode,
  resetPasswordConfirm,
  resetPasswordSentCode,
  signUp,
} from '../utils/cognito';
import { DEFAULT_URL } from './API/users/useAPIUser';

const useAuth = () => {
  const { setSession, clearSession } = useSessionCtx();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await loginUser({ username: email, password });
    setSession(await getCurrentSession());
  };

  const register = async ({
    email,
    password,
    name,
    given_name,
  }: {
    email: string;
    password: string;
    name: string;
    given_name: string;
  }) => {
    await signUp({ email, password, name, given_name });
    // setSession(await getCurrentSession());

    // create and user in the database
    const response = await fetch(`${DEFAULT_URL}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstname: name,
        lastname: given_name,
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
  };

  const confirmUser = ({ email, code }: { email: string; code: string }) => {
    confirmSignUp({ username: email, code });
  };

  const forgetPasswordSendCode = ({ email }: { email: string }) => {
    resetPasswordSentCode({ username: email });
  };

  const confirmUserSendNewCode = ({ email }: { email: string }) => {
    resendConfirmationCode({ username: email });
  };

  const forgetPasswordConfirm = ({
    email,
    code,
    password,
  }: {
    email: string;
    code: string;
    password: string;
  }) => {
    resetPasswordConfirm({ username: email, code, password });
  };

  const logout = () => {
    logoutUser();
    clearSession();
  };

  return {
    login,
    register,
    confirmUser,
    forgetPasswordSendCode,
    forgetPasswordConfirm,
    logout,
    confirmUserSendNewCode,
  };
};

export default useAuth;
