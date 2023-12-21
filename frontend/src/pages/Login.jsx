import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import Button from '../components/Button';

const Login = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(e => {
    });
  }
  return (
    <div className="h-screen w-screen bg-login bg-cover flex flex-col items-center justify-center">
      <div className="absolute w-screen h-screen bg-black opacity-75"></div>
      <Button
        className="flex items-center bg-epitechBlue text-white px-3 py-2 rounded-lg font-bold gap-3 hover:scale-105 transition duration-200 z-10"
        onClick={handleLogin}
      >
        <img src="/microsoft.png" alt="" className="h-8 aspect-square" />
        <span>Connexion Microsoft</span>
      </Button>
    </div>
  )
}

export default Login;
