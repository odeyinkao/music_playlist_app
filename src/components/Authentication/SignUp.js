import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_UP } from "../../graphql/mutations";
import { authenticate, setCurrentUser, setModal } from "../../store/actions";
import Input from "../UI/Input";

const SignUp = () => { 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signUp, {loading}]= useMutation(SIGN_UP, {
    onCompleted: (result) => {
      console.log(result);
      if(result) {
        localStorage.setItem("mp-token", result.signup.token)
        dispatch(authenticate(true))
        dispatch(setCurrentUser(result.signup.user))
        dispatch(setModal(true, result.signup.user.email+", you're logged in...",))
        // navigate('/')
      }
    },
    onError: (err) => {
      if(err) {
        dispatch(setModal(true, err.message))
      }
    }
  })

  let [emailInput, setEmailInput] = useState("")
  let [passwordInput, setPasswordInput] = useState("")
  let [confirmPasswordInput, setConfirmPasswordInput] = useState("")

  const emailInputChangeHandler = (e) => {
    if(!loading) setEmailInput(e.target.value);
  }

  const passwordInputChangeHandler = (e) => {
    if(!loading) setPasswordInput(e.target.value);
  }

  const confirmPasswordInputChangeHandler = (e) => {
    if(!loading) setConfirmPasswordInput(e.target.value);
  }

  const signUpHandler = (e) => {
    e.preventDefault()

    if(passwordInput.length < 6) {
      dispatch(setModal(true, "Your password must be at least 6 characters long."))
      return
    }
    else if(passwordInput !== confirmPasswordInput){
      dispatch(setModal(true, "Your passwords must match!"))
      return
    }

    signUp({variables: {
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
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account.</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={signUpHandler}>
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
              placeHolder="Choose a password..."
              value={passwordInput}
              onInputChangeHandler={passwordInputChangeHandler}/>

            <Input 
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeHolder="Type password again..."
              value={confirmPasswordInput}
              onInputChangeHandler={confirmPasswordInputChangeHandler}/>

            <div>
              <button
                type="submit"
                className={"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" + (loading ? " opacity-50" : "")}
              >
                {loading ? "Submitting..." : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-3 text-xs text-center">
            Have an account already? 
            <span className="text-indigo-500 font-medium">
              <Link to="/"> Login here.</Link>
            </span>
          </p>
        </div>
      </div>

    </div>
  )
};

export default SignUp;