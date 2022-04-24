import { useMutation, useQuery } from "@apollo/client";
import { DotsCircleHorizontalIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { DELETE_PLAN } from "../../graphql/mutations";
import { GET_PLANS } from "../../graphql/queries";
import { setModal } from "../../store/actions";
import ErrorMessage from "../UI/ErrorMessage";
import Loader from "../UI/Loader";


const PlanList = () => {
  const dispatch = useDispatch()
  const [deletePlan, {called, loading: deleteLoading}] = useMutation(DELETE_PLAN, {
    onCompleted: () => {      
      dispatch(setModal(true, "Plan deleted successfully!"))
    },
    onError: (err) => {
      dispatch(setModal(true, err.message))
    },
    refetchQueries: [
      GET_PLANS
    ]
  })

  const {data, loading, error} = useQuery(GET_PLANS, {
    fetchPolicy: 'network-only'
  })
  
  const deletePlanHandler = (plan) => {    
    dispatch(setModal(true, `Are you sure to ${plan.name}?`, "Delete Plan", () => deletePlan({variables: { planId: plan.id }})))
  }

  if((called && deleteLoading) || loading) return <Loader />;
  if(error) return <ErrorMessage message={error.message} />;
  
  console.log(data);
  return(
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Plans</h1>
          <p className="mt-2 text-sm text-gray-700">
            The list of all plans.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <NavLink
            to={"/plans/new"}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Plan
          </NavLink>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="shadow-md rounded-md mx-8 m-auto">
              <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                <thead className="bg-gray-50">
                  <tr>
                  <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Playlist Size
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data.plans.map((plan, planIdx) => (
                    <tr key={planIdx}>
                      <td
                        className='border-b border-gray-200 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      >
                        {++planIdx}
                      </td>
                      <td
                        className='border-b border-gray-200 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      >
                        {plan.name}
                      </td>
                      <td
                        className='border-b border-gray-200 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      >
                        {plan.playlistSize}
                      </td>
                      <td
                        className='border-b border-gray-200 relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                      >
                        <NavLink 
                          to={`/plans/${plan.id}/edit`}
                        >
                          <PencilAltIcon className={'text-yellow-500 hover:text-yellow-700 flex-shrink-0 h-5 w-5 inline-block'} aria-hidden="true" />
                        </NavLink>
                        <NavLink 
                          to={`/plans/${plan.id}/details`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <DotsCircleHorizontalIcon className={'text-indigo-600 hover:text-indigo-900 flex-shrink-0 h-5 w-5 inline-block'} aria-hidden="true" />
                        </NavLink>
                        <TrashIcon onClickCapture={() => deletePlanHandler(plan)} className={'text-red-600 hover:text-red-900 flex-shrink-0 h-5 w-5 inline-block'} aria-hidden="true" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  )
};

export default PlanList;