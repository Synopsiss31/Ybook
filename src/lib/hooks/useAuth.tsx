import { useEffect } from "react";
import {login as loginUser, logout as logoutUser, signUp, confirmSignUp, resetPasswordSentCode, resetPasswordConfirm, getCurrentSession} from "@/lib/utils"
import { useSessionCtx } from "../contexts/SessionCtx";

const useAuth = () => {

  const {setSession, clearSession} = useSessionCtx();

  
  useEffect(() => {
    console.log('useAuth useEffect');
  }, []);

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

  const register = ({ 
    email,
    password,
    name,
    given_name
  }: {
    email: string;
    password: string;
      name: string;
      given_name: string;
  }) => {
    signUp({email, password, name, given_name});
  };

  const confirmUser = ({
    email,
    code,
  }: {
    email: string
    code: string
    }) => {
    confirmSignUp({ username:email, code });
  };

  const forgetPasswordSendCode = ({
    email,
  }: {
      email: string;
    }) => {
    resetPasswordSentCode({ username: email });
  };

  const forgetPasswordConfirm = ({
    email,
    code,
    password
  }: {
    email: string
    code: string
    password: string
    }) => {
    resetPasswordConfirm({ username: email, code, password });
  };


  const logout = () => {
    console.log('logout');
    logoutUser();
    clearSession();
  };


  return { login, register, confirmUser, forgetPasswordSendCode, forgetPasswordConfirm, logout};
}

export default useAuth;
