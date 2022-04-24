import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PLAN } from "../../graphql/queries";
import { createPlan, updatePlan } from "../../store/actions";
import ErrorMessage from "../UI/ErrorMessage";
import Input from "../UI/Input";
import Loader from "../UI/Loader";

const PlanForm = () => {
  const params = useParams()
  const [loadPlan, {called, loading, error}] = useLazyQuery(
    GET_PLAN,
    {
      variables: {id: params.planId},
      onCompleted: (data) => {
        setNameInput(data.plan.name)
        setSizeInput(data.plan.playlistSize)
      }
    },
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let [isLoading, setIsLoading] = useState(false)
  let [isEdit] = useState(params.hasOwnProperty("planId"))
  let [nameInput, setNameInput] = useState("")
  let [sizeInput, setSizeInput] = useState(1)

  useEffect(() => {
    if(params.hasOwnProperty("planId")){
      loadPlan()
    }
  })

  const nameInputChangeHandler = (e) => {
    setNameInput(e.target.value)
  }

  const sizeInputChangeHandler = (e) => {
    setSizeInput(e.target.value)
  }

  const planSubmitHandler = (e) => {
    e.preventDefault()

    const data = {
      name: nameInput,
      playlistSize: +sizeInput
    }

    setIsLoading(true)
    isEdit ? dispatch(updatePlan(params.planId, data, navigate)) : dispatch(createPlan(data, navigate))
  }

  if(called && loading) return <Loader />;
  if(error) return <ErrorMessage message={error.message} />;

  return(
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Update" : "Add New"} Plan
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Fill the form to add a new plan.
          </p>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={planSubmitHandler}>
            
            <Input 
              id="name"
              label="Name"
              placeHolder="Enter name of the plan..."
              value={nameInput}
              onInputChangeHandler={nameInputChangeHandler}/>
            
            <Input 
              id="playlistSize"
              type="number"
              label="Playlist Size"
              value={sizeInput}
              onInputChangeHandler={sizeInputChangeHandler}/>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" + (isLoading ? " opacity-50 cursor-wait" : "")}
              >
                { isLoading ? isEdit ? "Updating" : "Submittiing" : isEdit ? "Update" : "Submit" }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default PlanForm;