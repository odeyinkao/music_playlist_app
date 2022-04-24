import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { UPDATE_USER_PLAYLIST } from "../../graphql/mutations";
import { GET_MUSICS, GET_MY_PLAYLIST } from "../../graphql/queries";
import { setModal, SET_PLAYLIST } from "../../store/actions";
import ErrorMessage from "../UI/ErrorMessage";
import Loader from "../UI/Loader";

const Playlist = ({ className }) => {
  const dispatch = useDispatch()
  const [musicIds, setMusicIds] = useState([])
  const {data, error, loading: getMyPlaylistLoading} = useQuery(GET_MY_PLAYLIST, {
    fetchPolicy: 'network-only',
    onError: (err) => {
      console.log(err);
    },
    onCompleted: (result) => {
      console.log("The Result");
      console.log(result);
    }
  })
  const [updatePlaylist, {called, loading: updateLoading}] = useMutation(UPDATE_USER_PLAYLIST, {
    onCompleted: (result) => {
      result = result.updateUserPlaylist
      delete result.__typename
      dispatch({
          type: SET_PLAYLIST,
          playlist: result.playlist
      })
      dispatch(setModal(true, "Music removed from your playlist successfully!"))
    },
    onError: (err) => {
      dispatch(setModal(true, err.message))
    },
    refetchQueries: [
        GET_MY_PLAYLIST,
        GET_MUSICS
    ]
  })
  
  const removeMusicHandler = (e) => {
    const finalMusicIds = []

    musicIds.forEach(musicId => {
      if(musicId != e.target.id) {
        finalMusicIds.push(musicId)
      }
    })
    
    updatePlaylist({variables: { musicIds: finalMusicIds }})
  }

  useEffect(() => {
    console.log("UseEffect");
    console.log(data);
    if(data) {setMusicIds(() => data.me.playlist.musics.map(music => music.id))}
  }, [data])

  console.log(data);
 if((called && updateLoading )|| getMyPlaylistLoading) return <Loader />;
  if(error) return <ErrorMessage message={error.message} />;

  return (
    <>
      {data.me.playlist.musics.length < 1 && 
      <p className={"text-center tracking-wide font-mono my-4" + className}>
        You do not have any music in your playlist. Click <NavLink to={"/all-music"} className="text-indigo-600">here</NavLink>  to add music.
      </p>}
      {data.me.playlist.musics.length > 0 &&        
        <div className={className}>
          <h2 className="font-medium text-3xl tracking-tight text-center my-5 w-8/12 m-auto border-b border-gray-500">My Playlist</h2>
          <ul className={"space-y-3 "}>
            {data.me.playlist.musics.map((music, musicIdx) => (
              <li key={"music"+musicIdx} className="bg-white shadow-sm divide-y overflow-hidden sm:rounded-md">
                <div className="flex justify-between items-center px-4 py-4 sm:px-6">
                  <span className="font-semibold text-lg">{music.name}</span>
                  <span
                    id={music.id}
                    onClick={removeMusicHandler}
                    className={'text-gray-400 hover:text-red-600 text-xl text-center font-bold inline-block cursor-pointer'}>
                      &times;
                  </span>
                </div>
                <p className="flex justify-end px-1 py-1 sm:px-4 uppercase text-xs font-medium text-yellow-600">{music.plan.name}</p>
              </li>
            ))}
          </ul>
        </div>
      }
    </>
  )
};

export default Playlist;
