import React from "react";
import axios from "axios";

import firebase, { auth } from "../firebase/config";

const _login = async () => {
  await auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(() => {
      auth.currentUser.getIdToken().then(async (idToken) => {
        const bodyParameters = {}; //empty body
        const config = { headers: { Authorization: `Bearer ${idToken}` } };
        axios
          .post(
            process.env.REACT_APP_BASE_API_URL + "/accounts/login",
            {},
            config
          )
          .then((response) => {
            if (response.data.isAdmin == false) {
              auth.signOut();
            }
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

function Login() {
  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="m-auto w-1/4 ">
        <div className="bg-indigo-500 py-24 px-10">
          <div className="pb-16 text-center text-white w-10/12 mx-auto">
            <div className="text-4xl pb-5">Welcome!</div>
            <div className="">
              Get on top of your money, achieve financial goals. Enjoy wonderful
              life and become financially independent.
            </div>
          </div>
          <div className=" px-10 py-10 bg-white bg-opacity- rounded-md">
            <div className="flex justify-center pb-2">
              <img
                src={require("assets/img/logo.png").default}
                width={100}
                height={100}
                alt="Logo"
              />
            </div>
            <div
              className="cursor-pointer px-12 py-3 mt-5 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 hover:shadow-2xl focus:outline-none"
              onClick={() => {
                _login();
              }}
            >
              <button className="flex items-center" color="default">
                <span className="">
                  <img src={require("assets/img/google.svg").default} />
                </span>
                <p className="pl-5">Sign in with Google</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
