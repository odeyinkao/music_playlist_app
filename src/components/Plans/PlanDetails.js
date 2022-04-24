import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { PencilAltIcon } from '@heroicons/react/solid'
import { useQuery } from "@apollo/client";
import { GET_PLAN } from "../../graphql/queries";
import Loader from "../UI/Loader";
import ErrorMessage from "../UI/ErrorMessage";

const PlanDetails = () => {
  const {planId} = useParams()
  const {data, loading, error} = useQuery(
    GET_PLAN, {
      variables: {id: +planId},
      fetchPolicy: 'network-only'
    })

  if(loading) return <Loader />;
  if(error) {
    return <ErrorMessage message={error.message} />
  };
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg w-11/12 m-auto">
      <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <div>            
          <h3 className="text-lg leading-6 font-medium text-gray-900">{data.plan.name}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">The details of the plan.</p>
        </div>
        <span>
          <Link to={`/plans/${data.plan.id}/edit`}>
            <PencilAltIcon className={'text-gray-400 mr-3 flex-shrink-0 h-6 w-6'} aria-hidden="true" />
          </Link>
        </span>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data.plan.name}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Playlist Size</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data.plan.playlistSize}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Musics <span className="rounded-sm shadow-lg text-white bg-indigo-800 font-bold text-xs px-1">{data.plan.musics.length}</span></dt>
            <dd className="bg-white mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {data.plan.musics.map((music, musicIdx) => (
                <li key={'music'+musicIdx} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <span className="ml-2 flex-1 w-0 truncate">{music.name}</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <NavLink to={`/musics/${music.id}/details`} className="font-medium text-indigo-600 hover:text-indigo-500">
                      Details
                    </NavLink>
                  </div>
                </li>
              ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )

};

export default PlanDetails;