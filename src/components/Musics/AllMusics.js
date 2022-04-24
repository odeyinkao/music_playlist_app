import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_PLAYLIST } from "../../graphql/mutations";
import { GET_MUSICS, GET_MY_PLAYLIST } from "../../graphql/queries";
import { setModal, SET_PLAYLIST } from "../../store/actions";
import ErrorMessage from "../UI/ErrorMessage";
import Loader from "../UI/Loader";

const AllMusics = ({ className }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [musicIds, setMusicIds] = useState([])
  const [allMusic, setAllMusic] = useState([])
  const {data, error, loading: getMusicsLoading} = useQuery(GET_MUSICS, {
    fetchPolicy: 'network-only'
  })
  const [updatePlaylist, {called, loading: updateLoading}] = useMutation(UPDATE_USER_PLAYLIST, {
    onCompleted: (result) => {
      result = result.updateUserPlaylist
      delete result.__typename
      dispatch({
          type: SET_PLAYLIST,
          playlist: result.playlist
      })
      dispatch(setModal(true, "Music added to your playlist successfully!", "Close", null))
    },
    onError: (err) => {
      dispatch(setModal(true, err.message))
    },    
    refetchQueries: [
      GET_MY_PLAYLIST,
      GET_MUSICS
    ]
  })

  const filterAllMusicData = (data) => {
    return data.musics.filter(music => !musicIds.includes(music.id))
  }

  const addMusicHandler = (e) => {
    updatePlaylist({variables: {musicIds: [+e.target.id, ...musicIds]}})
  }

  useEffect(() => {
    setMusicIds(() => currentUser.playlist.musics.map(music => music.id))
    if(data) {setAllMusic(filterAllMusicData(data))}
  }, [currentUser.playlist.musics, data])

  if((called && updateLoading) || getMusicsLoading) return <Loader />;
  if(error && updateLoading) return <ErrorMessage message={error.message} />;

  return (
    <div className="w-6/12 my-4 m-auto flex-1">
      <h2 className="font-medium text-3xl tracking-tight text-center my-5 w-8/12 m-auto border-b border-gray-500">All Music</h2>
      <ul className={"space-y-3 " + className}>
          {allMusic.map((music, musicIdx) => (
            <li key={"music"+musicIdx} className="bg-white shadow-sm divide-y overflow-hidden sm:rounded-md">
              <div className="flex justify-between items-center px-4 py-4 sm:px-6">
                <span className="font-semibold text-lg">{music.name}</span>
                <button 
                  id={music.id}
                  onClick={addMusicHandler}
                  className={'bg-yellow-600 text-white text-xl hover:bg-yellow-700 font-bold px-2 rounded-sm inline-block'}
                >
                  +
                </button>
              </div>
              <p className="flex justify-end px-1 py-1 sm:px-4 uppercase text-xs font-medium text-yellow-600">{music.plan.name}</p>
            </li>
          ))}
      </ul>
    </div>
  )
};

export default AllMusics;
