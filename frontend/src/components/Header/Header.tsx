import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkIsAuth, logOut } from '../../redux/slices/authSlice'
import { RootState } from '../../redux/store'
import LoginModal from '../Modals/LoginModal'
import RegisterModal from '../Modals/RegisterModal'

const Header = () => {
  const dispatch = useDispatch()

  const [isLoginOpen, setLoginIsOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const isAuth = useSelector(checkIsAuth)
  // console.log(isAuth, 'check auth - Header')

  const handleLogOut = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logOut())
      // delete token after log out
      window.localStorage.removeItem('token')
    }
  }

  // Get user info to display username in header
  const userData = useSelector((state: RootState) => state.user.userData)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(true)

  return (
    <header className='bg-white'>
      <div className='header-content-container max-w-6xl mx-auto flex justify-between items-center py-2 px-4'>
        <div className='header-logo'>
          <Link
            to={'/'}
            className='bg-black text-white hover:bg-black/80 py-2 px-2 sm:px-8 rounded font-black tracking-wider block'
            // block - otherwise mobile uneven block
          >
            MERN BLOG
          </Link>
        </div>

        {/* Login / Register */}
        <div className='header-user flex gap-1 sm:gap-5 items-center relative'>
          {/* eslint: */}
          {/* {isAuth
            ? <>
            <Link to={'/posts/create'}>Create Post</Link>
              <button>Logout</button>
            </>
            : <>
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
            </> } */}
          {/* prettier: */}
          {/* eslint-disable-next-line multiline-ternary */}
          {isAuth ? (
            <>
              <Link
                to={'/posts/create'}
                className='bg-indigo-500 text-white px-2 sm:px-4 h-full py-1 rounded hover:bg-indigo-600'
              >
                Create Post
              </Link>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-stone-500 hover:text-black p-0 rounded bg-white border border-slate-300'"
              >
                {/* Header username button icon circle with username 1st letter -> open logout menu */}
                <div className='bg-slate-600 text-white font-semibold rounded-full min-h-[2rem] min-w-[2rem] text-center leading-8 hover:bg-slate-700'>
                  {/* if no username -> page crash -> fallback 'A' letter as username for 'Anonymous' */}
                  {userData && userData.fullName ? userData.fullName[0] : 'A'}
                </div>
              </button>
              {/* Dropdown user menu - user name & user logout button */}
              {isUserMenuOpen && (
                <div className='absolute top-full right-0 p-4 py-6 bg-white shadow-md flex flex-col gap-4'>
                  {/* Username */}
                  <div className='font-semibold text-center pb-4 border-b'>
                    {/* {userData && userData.fullName} */}
                    {userData && userData.fullName ? userData.fullName : 'Anonymous'}
                  </div>
                  {/* Logout button */}
                  <button
                    className='text-stone-500 hover:text-black py-1 px-4 rounded bg-white border border-slate-300'
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                className='bg-indigo-500 text-white border border-transparent py-1 px-4 rounded hover:bg-indigo-500/90'
                onClick={() => setIsRegisterOpen(true)}
              >
                Register
              </button>
              {/* <Link
                to={'/register'}
                className='bg-indigo-500 text-white border border-transparent py-1 px-4 rounded hover:bg-indigo-500/90'
              >
                Register
              </Link> */}
              <button
                // to={'/login'}
                className='bg-white border border-slate-300 py-1 px-4 rounded hover:text-slate-500'
                onClick={() => setLoginIsOpen(true)}
              >
                Login
              </button>
              {/* <Link
                to={'/login'}
                className='bg-white border border-slate-300 py-1 px-4 rounded hover:text-slate-500'
              >
                Login
              </Link> */}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <LoginModal isLoginOpen={isLoginOpen} setLoginIsOpen={setLoginIsOpen} />
      <RegisterModal isRegisterOpen={isRegisterOpen} setIsRegisterOpen={setIsRegisterOpen} />
    </header>
  )
}

export default Header
