/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from 'react'
import {
  HomeIcon,
  CurrencyDollarIcon,
  MenuIcon,
  MusicNoteIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import MobileNavigation from '../components/Navigation/MobileNavigation';
import MainNavigation from '../components/Navigation/MainNavigation';
import { Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Plans from '../components/Plans/Plans';
import Musics from '../components/Musics/Musics';
import Users from '../components/UsersList';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
  { name: 'Plans', href: '/plans', icon: CurrencyDollarIcon, current: false },
  { name: 'Musics', href: '/musics', icon: MusicNoteIcon, current: false },
  { name: 'Users', href: '/users', icon: UsersIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AdminScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <MobileNavigation 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen} 
          classNames={classNames}
          navigation={navigation}  />
        {/* Static sidebar for desktop */}
        <MainNavigation 
          classNames={classNames}
          navigation={navigation} />
          
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/plans/*' element={<Plans />} />
                <Route path='/musics/*' element={<Musics />} />
                <Route path='/users/*' element={<Users />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
      <Outlet />
    </>
  )
};

export default AdminScreen;
