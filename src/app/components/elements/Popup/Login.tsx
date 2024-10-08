"use client";

import { UserModel } from "@/app/types/model";
import axios from "@configs/axios";
import useLoginPopup from "@hooks/useLoginPopup";
import useUser from "@hooks/useUser";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { Discord, Google } from "react-bootstrap-icons";

const LoginPopup = () => {
  const { showLoginPopup, setShowLoginPopup } = useLoginPopup();
  const { setUser } = useUser();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    setShowLoginPopup(false);
    const response = await axios.post("/auth", {
      credential: credentialResponse.credential,
    });

    const user: UserModel = jwtDecode(response.data.token);
    setUser(user);

    localStorage.setItem("token", response.data.token);
  };

  // useEffect(() => {
  //     const token = localStorage.getItem("token");

  //     if (token) {
  //         const decoded = jwtDecode(token);
  //         const currentTime = Date.now() / 1000;

  //         if (decoded.exp && decoded.exp > currentTime) {
  //             setUser(decoded as UserModel);
  //         } else {
  //             localStorage.removeItem("token");
  //             setUser(null);
  //         }
  //     }
  // }, [setUser])

  const handleClose = () => setShowLoginPopup(false);

  return (
    <>
      {showLoginPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <div
            className="relative w-96 rounded-lg bg-white p-8 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-6 top-6 text-2xl text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              &times;
            </button>
            <h2 className="mb-4 text-2xl font-bold">Login</h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center gap-2 rounded border bg-white px-4 py-3 transition-all hover:border-blue-100 hover:bg-blue-200 hover:bg-opacity-5"
              >
                <GoogleIcon />
                <p className="flex-1 text-center text-sm text-gray-700">
                  Sign in with Google
                </p>
              </button>

              <button
                onClick={() => signIn("discord")}
                className="flex items-center justify-center gap-2 rounded bg-[#2e3136] px-4 py-3 hover:bg-[#3b3f45]"
              >
                <Discord color="#fff" />
                <p className="flex-1 text-center text-sm text-white">
                  Sign in with Discord
                </p>
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setShowLoginPopup(false)}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const GoogleIcon = () => {
  return (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      width="20"
      height="24"
      viewBox="0 0 40 48"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"
      ></path>
      <path
        fill="#34A853"
        d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"
      ></path>
      <path
        fill="#FABB05"
        d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"
      ></path>
      <path
        fill="#E94235"
        d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"
      ></path>
    </svg>
  );
};

export default LoginPopup;
