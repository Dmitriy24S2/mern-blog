import React, { useEffect } from 'react'
import Header from './components/Header/Header'
import FullPost from './pages/FullPost/FullPost'
import Home from './pages/Home/Home'

import { Route, Routes } from 'react-router-dom'
import CreatePost from './pages/CreatePost/CreatePost'
import { fetchAuthMe } from './redux/slices/authSlice'
import { useAppDispatch } from './redux/store'

const App = () => {
  const dispatch = useAppDispatch()

  // const isAuth = useSelector(checkIsAuth)

  // Check if logged in -> if have token in localStorage -> means logged in
  useEffect(() => {
    dispatch(fetchAuthMe())
    // {success: true,…}
    // avatarUrl:"https://www.resetera.com/forums/etcetera-forum.9/z"
    // createdAt:"2022-10-03T17:52:04.346Z"
    // email:"johndoe@test.com"
    // fullName:"John Doe"
    // success:true
    // updatedAt:"2022-10-03T17:52:04.346Z"
    // user:{_id: "633b2144ad263568ee0fff69", fullName: "John Doe", email: "johndoe@test.com",…}
    // __v:0
    // _id:"633b2144ad263568ee0fff69"
  }, [])

  return (
    <>
      <Header />
      <div className='wrapper max-w-6xl mx-auto px-4 pb-20'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={<CreatePost />} />
          <Route path='/posts/create' element={<CreatePost />} />
        </Routes>
      </div>
    </>
  )
}

export default App
