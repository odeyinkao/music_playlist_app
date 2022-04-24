/* This example requires Tailwind CSS v2.0+ */
import { useMutation } from '@apollo/client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { SIGN_OUT } from '../../graphql/mutations';
import { authenticate, setCurrentUser, setModal } from '../../store/actions';

const classNames = (isActive) => {
  let classes = 'group flex items-center px-2 py-2 text-sm font-medium rounded-md ';

  if(isActive) {
    classes += 'bg-gray-900 text-white';
  } else {
    classes += 'text-gray-300 hover:bg-gray-700 hover:text-white';
  }

  return classes;
}

const MainNavigation = ({navigation}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser);
  const [signOut, {loading}]= useMutation(SIGN_OUT, {
    variables: { token: localStorage.getItem("mp-token")},
    onCompleted: () => {
      localStorage.removeItem("mp-token")
      dispatch(authenticate(false))
      dispatch(setCurrentUser(null))
      dispatch(setModal(true, "You're logged out...",))
      navigate('/')
    }
  })

  return (
    <>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <NavLink 
                  key={item.name} 
                  to={item.href}
                  className={({ isActive }) => classNames(isActive) }
                >                
                  <item.icon
                    className={'text-gray-300 mr-3 flex-shrink-0 h-6 w-6'}
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex bg-gray-700 p-4 cursor-pointer">
            <span onClick={() => signOut()} className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{currentUser.email}</p>
                  <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">{loading ? "Logging Out..." : "Sign Out"}</p>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  )
};

export default MainNavigation;
