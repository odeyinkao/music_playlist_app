import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MUSIC } from "../../graphql/queries";
import Loader from "../UI/Loader";
import ErrorMessage from "../UI/ErrorMessage";

const MusicDetails = () => {
  const {musicId} = useParams()
  const {data, loading, error} = useQuery(
    GET_MUSIC, {
      variables: {id: +musicId},
      fetchPolicy: 'network-only'
    })

  if(loading) return <Loader />;
  if(error) return <ErrorMessage message={error.message} />;
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg w-11/12 m-auto">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{data.music.name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">The details of the music.</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data.music.name}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Plan</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <NavLink to={`/plans/${data.music.plan.id}/details`} className="underline">{data.music.plan.name}</NavLink> 
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )

};

export default MusicDetails;