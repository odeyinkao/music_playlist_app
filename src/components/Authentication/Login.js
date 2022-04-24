import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN } from "../../graphql/mutations";
import { authenticate, setCurrentUser, setModal } from  "../../store/actions";
import Input from "../UI/Input";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signIn, {loading}]= useMutation(SIGN_IN, {
    onCompleted: (result) => {
      console.log(result);
      if(result) {
        localStorage.setItem("mp-token", result.signin.token)
        dispatch(authenticate(true))
        dispatch(setCurrentUser(result.signin.user))
        dispatch(setModal(true, result.signin.user.email+", you're logged in...",))
        // navigate('/')
      }
    },
    onError: (err) => {
      if(err) {
        dispatch(setModal(true, err.message))
      }
    }
  })

  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  const emailInputChangeHandler = (e) => {
    if(!loading) setEmailInput(e.target.value);
  }

  const passwordInputChangeHandler = (e) => {
    if(!loading) setPasswordInput(e.target.value);
  }

  const signInHandler = (e) => {
    e.preventDefault()

    if(passwordInput.length < 6) {
      dispatch(setModal(true, "Your password must be at least 6 characters long."))
      return
    }

    signIn({variables: {
      email: emailInput,
      password: passwordInput
    }})
  }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={signInHandler}>
            
            <Input 
              id="email"
              label="Email"
              type="email"
              placeHolder="Your email address..."
              value={emailInput}
              onInputChangeHandler={emailInputChangeHandler}/>

            <Input 
              id="password"
              label="Password"
              type="password"
              placeHolder="Your password..."
              value={passwordInput}
              onInputChangeHandler={passwordInputChangeHandler}/>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" + (loading ? " opacity-50" : "")}
              >                
                {loading ? "Submitting..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-3 text-xs text-center">
            Don't have an account? 
            <span className="text-indigo-500 font-medium">
              <Link to="/register"> Register here.</Link>
            </span>
          </p>
        </div>
      </div>

    </div>
  )
};

export default Login;