/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../store/actions';
import AdminScreen from './AdminScreen';
import PublicScreen from './PublicScreen';


const MainScreen = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  if(!currentUser) {dispatch(authenticate(false))}

  if(["superadmin", "admin"].includes(currentUser.role)) return <AdminScreen />
  else return <PublicScreen />
};

export default MainScreen;
