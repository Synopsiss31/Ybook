import { UserCtrlService } from '@/services/openapi';

import { useSessionCtx } from '../contexts/SessionCtx';
import {
  confirmSignUp,
  getCurrentSession,
  login as loginUser,
  logout as logoutUser,
  resetPasswordConfirm,
  resetPasswordSentCode,
  signUp,
} from '../utils/cognito';

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
    setSession(await getCurrentSession());
    UserCtrlService.userCtrlCreate({
      email,
      firstname: given_name,
      lastname: name,
    }).catch((_) => {
      /* empty */
    });
  };

  const confirmUser = ({ email, code }: { email: string; code: string }) => {
    confirmSignUp({ username: email, code });
  };

  const forgetPasswordSendCode = ({ email }: { email: string }) => {
    resetPasswordSentCode({ username: email });
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
  };
};

export default useAuth;
