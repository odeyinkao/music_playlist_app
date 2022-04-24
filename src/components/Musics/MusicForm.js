import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GET_MUSIC, GET_PLANS } from "../../graphql/queries";
import { createMusic, updateMusic } from "../../store/actions";
import ErrorMessage from "../UI/ErrorMessage";
import Input from "../UI/Input";
import Loader from "../UI/Loader";

const MusicForm = () => {
  const params = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [isLoading, setIsLoading] = useState(false)
  let [isEdit] = useState(params.hasOwnProperty("musicId"))
  let [nameInput, setNameInput] = useState("")
  let [planIdInput, setPlanIdInput] = useState(1)
  const {data: allPlans, loading: plansLoading, error: plansError} = useQuery(GET_PLANS, {
    onCompleted: (result) => {
      if(result.hasOwnProperty("plans") && result.plans.length > 0) {
        setPlanIdInput(result.plans[0].id)
      }
    }
  })
  const [loadMusic, {called, loading, error}] = useLazyQuery(
    GET_MUSIC,
    {
      variables: {id: params.musicId},
      onCompleted: (data) => {
        setNameInput(data.music.name)
        setPlanIdInput(data.music.planId)
      }
    },
  )

  
  useEffect(() => {
    if(params.hasOwnProperty("musicId")){
      loadMusic()
    }
  })

  const nameInputChangeHandler = (e) => {
    setNameInput(e.target.value)
  }

  const planIdInputChangeHandler = (e) => {
    setPlanIdInput(e.target.value)
  }

  const planSubmitHandler = (e) => {
    e.preventDefault()

    const data = {
      name: nameInput,
      planId: +planIdInput
    }

    console.log(data);

    setIsLoading(true)
    isEdit ? dispatch(updateMusic(params.musicId, data, navigate)) : dispatch(createMusic(data, navigate))
  }

  if((called && loading) || plansLoading) return <Loader />;
  if(error || plansError) return <ErrorMessage message={error ? error.message : plansError.message} />;

  return(
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Update" : "Add New"} Music
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Fill the form to add a new music.
          </p>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={planSubmitHandler}>

            <Input 
              id="name"
              label="Name"
              placeHolder="Enter name of the music..."
              value={nameInput}
              onInputChangeHandler={nameInputChangeHandler}/>
            
            <Input 
              id="plan"
              label="Plan"
              type="select"
              placeHolder="Select plan..."
              value={planIdInput}
              onInputChangeHandler={planIdInputChangeHandler}
              options={allPlans.plans.map(plan => {
                 return {value: plan.id, text: plan.name} 
              })}/>

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

export default MusicForm;