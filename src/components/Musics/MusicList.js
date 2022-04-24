import { useMutation, useQuery } from "@apollo/client";
import { DotsCircleHorizontalIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { DELETE_MUSIC } from "../../graphql/mutations";
import { GET_MUSICS } from "../../graphql/queries";
import { setModal } from "../../store/actions";
import ErrorMessage from "../UI/ErrorMessage";
import Loader from "../UI/Loader";

const MusicList = () => {  
  const dispatch = useDispatch()
  const [deleteMusic, {called, loading: deleteLoading}] = useMutation(DELETE_MUSIC, {
    onCompleted: () => {      
      dispatch(setModal(true, "Music deleted successfully!"))
    },
    onError: (err) => {
      dispatch(setModal(true, err.message))
    },
    refetchQueries: [
      GET_MUSICS
    ]
  })

  const {data, loading, error} = useQuery(GET_MUSICS, {
    fetchPolicy: 'network-only'
  })

  const deleteMusicHandler = (music) => {    
    dispatch(setModal(true, `Are you sure to delete ${music.name}?`, "Delete Music", () => deleteMusic({variables: { musicId: music.id }})))
  }

  if((called && deleteLoading) || loading) return <Loader />;
  if(error) return <ErrorMessage message={error.message} />;
  
  return(
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Musics</h1>
          <p className="mt-2 text-sm text-gray-700">
            The list of all musics.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <NavLink
            to={"/musics/new"}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Music
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
                      Plan
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
                  {data.musics.map((music, musicIdx) => (
                    <tr key={musicIdx}>
                      <td
                        className='border-b border-gray-200 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      >
                        {++musicIdx}
                      </td>
                      <td
                        className='border-b border-gray-200 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      >
                        {music.name}
                      </td>
                      <td
                        className='border-b border-gray-200 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      >
                        <NavLink to={`/plans/${music.plan.id}/details`} className="underline">{music.plan.name}</NavLink>                        
                      </td>
                      <td
                        className='border-b border-gray-200 relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                      >
                        <NavLink 
                          to={`/musics/${music.id}/edit`}
                        >
                          <PencilAltIcon className={'text-yellow-500 hover:text-yellow-700 flex-shrink-0 h-5 w-5 inline-block'} aria-hidden="true" />
                        </NavLink>
                        <NavLink to={`/musics/${music.id}/details`}>
                          <DotsCircleHorizontalIcon className={'text-indigo-600 hover:text-indigo-900 flex-shrink-0 h-5 w-5 inline-block'} aria-hidden="true" />
                        </NavLink>
                        <TrashIcon onClickCapture={() => deleteMusicHandler(music)} className={'text-red-600 hover:text-red-900 flex-shrink-0 h-5 w-5 inline-block'} aria-hidden="true" />
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

export default MusicList;