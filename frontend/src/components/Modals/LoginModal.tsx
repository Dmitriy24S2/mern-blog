import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { authParams, checkIsAuth, fetchUserData } from '../../redux/slices/authSlice'
import { useAppDispatch } from '../../redux/store'

interface LoginProps {
  isLoginOpen: boolean
  setLoginIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({ isLoginOpen, setLoginIsOpen }: LoginProps) => {
  const dispatch = useAppDispatch()

  const isAuth = useSelector(checkIsAuth)
  // console.log(isAuth, 'check auth - Login modal')

  // If recieve user data -> successful login -> close login modal:
  useEffect(() => {
    if (isAuth) {
      setLoginIsOpen(false)
    }
  }, [isAuth])

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
    // formState
  } = useForm({
    defaultValues: {
      // email: 'johndoe@test.com',
      email: 'johndoe22@test.com',
      password: '12345z2',
      undefined: ''

      // wrong email:
      // POST http://localhost:4444/auth/login 500 (Internal Server Error)
      // {message: "Unable to login"}
      // message:"Unable to login"

      // wrong password:
      // POST http://localhost:4444/auth/login 404 (Not Found)
      // {message: "Incorrect login or password"} // ! change? different error message email vs password
      // message:"Incorrect login or password"

      // when not complete email:
      // POST http://localhost:4444/auth/login 400 (Bad Request)
      // 0: {value: "johndoe@test", msg: "Wrong email format", param: "email", location: "body"}
      // location:"body"
      // msg:"Wrong email format"
      // param:"email"
      // value:"johndoe@test"

      // on success:
      // async fetch user data slice
      // {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…E0N30.OClDexzI-ZCytC3uoac2X9JEA_Rpb7ma6UVo4-FlrMI', _id: '633b2144ad263568ee0fff69', fullName: 'John Doe', email: 'johndoe@test.com', avatarUrl: 'https://www.resetera.com/forums/etcetera-forum.9/z', …}
      // avatarUrl: "https://www.resetera.com/forums/etcetera-forum.9/z"
      // createdAt : "2022-10-03T17:52:04.346Z"
      // email: "johndoe@test.com"
      // fullName: "John Doe"
      // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNiMjE0NGFkMjYzNTY4ZWUwZmZmNjkiLCJpYXQiOjE2NjUzODExNDcsImV4cCI6MTY2Nzk3MzE0N30.OClDexzI-ZCytC3uoac2X9JEA_Rpb7ma6UVo4-FlrMI"
      // updatedAt: "2022-10-03T17:52:04.346Z"
      // __v:0
      // _id:"633b2144ad263568ee0fff69"
    }
  })

  console.log({ errors })

  const onSubmit = async (values: authParams) => {
    // console.log(values)
    // {email: 'dfsdfsdf@dsfsd', password: 'sdfsdfsdfsd'}
    // email:"dfsdfsdf@dsfsd"
    // password:"sdfsdfsdfsd"
    // dispatch(fetchUserData(values))
    try {
      // const data = await dispatch(fetchUserData(values))
      const data = await dispatch(fetchUserData(values)).unwrap()
      console.log('on submit payload data await', data)
      // avatarUrl: 'https://www.resetera.com/forums/etcetera-forum.9/z'
      // createdAt: '2022-10-03T17:52:04.346Z'
      // email: 'johndoe@test.com'
      // fullName: 'John Doe'
      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNiMjE0NGFkMjYzNTY4ZWUwZmZmNjkiLCJpYXQiOjE2NjU0MDAwMzgsImV4cCI6MTY2Nzk5MjAzOH0.r8n7fAMj-3xkdHckd5hkOSxqs7s7UWyaEyp-RjKup-U'
      // updatedAt: '2022-10-03T17:52:04.346Z'
      // __v: 0
      // _id: '633b2144ad263568ee0fff69'

      // const payload = data.payload as UserDataType // ! to use server backend error msg -> unwrap() different structure now -> no .payload?

      if (!data) {
        alert('Failed to authorize1?')
      }
      // ! to use server backend error msg -> unwrap() different structure now -> no .payload?
      // if (!payload) {
      //   alert('Failed to authorize2?') // error
      // }

      // save token to localStorage
      if ('token' in data) {
        window.localStorage.setItem('token', data.token)
      }
      // ! to use server backend error msg -> unwrap() different structure now -> no .payload?
      // if ('token' in payload) {
      //   window.localStorage.setItem('token', payload.token)
      // }
    } catch (error: any) {
      console.log('Modal error message:', JSON.parse(error.message))
      // Modal error message: {msg: 'User not found'}
      // msg: "User not found"

      const errorArr = JSON.parse(error.message)

      console.log({ errorArr })
      //   {
      //     "errorArr": {
      //         "msg": "Unable to login"
      //     }
      // }
      // setError(err.param, {
      setError('undefined', {
        type: 'server',
        message: errorArr.msg
      })
    }
  }

  return (
    <Transition appear show={isLoginOpen} as={Fragment}>
      {/* <Dialog open={isLoginOpen} onClose={() => setLoginIsOpen(false)} className='relative z-50'> */}
      <Dialog onClose={() => setLoginIsOpen(false)} className='relative z-50'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        {/* <div className='fixed inset-0 bg-black/30' aria-hidden='true' /> */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          {/* <div className='fixed inset-0 bg-black bg-opacity-25' aria-hidden='true' /> */}
          <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        </Transition.Child>

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            {/* The actual dialog panel  */}
            <Dialog.Panel className='mx-auto max-w-sm rounded bg-white p-8 min-w-[22rem]'>
              <Dialog.Title className='text-center mb-8 text-indigo-600 text-3xl font-bold'>
                Login
              </Dialog.Title>
              <form
                className='flex flex-col'
                onSubmit={(e) => {
                  clearErrors() // to keep form register submit attempt work after 1st error otherwise stops submitting
                  handleSubmit(onSubmit)(e)
                }}
              >
                <div className='mb-6 relative'>
                  {/* Email input */}
                  <label
                    htmlFor='email'
                    className='relative -bottom-2 ml-3 inline-block px-1 bg-white text-indigo-500'
                  >
                    Email
                  </label>
                  <input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    className={`px-4 pb-2 pt-3 border border-slate-200 w-full ${
                      errors?.email && 'border-red-600'
                    }`}
                    {...register('email', { required: 'Please enter email' })}
                  />
                  {/* input error msg */}
                  {errors?.email && (
                    <p className='text-red-600 tracking-wider ml-4 mt-2'>{errors.email.message}</p>
                  )}
                </div>
                {/* Password input */}
                <div className='relative'>
                  <label
                    htmlFor='password'
                    className='relative -bottom-2 ml-3 inline-block px-1 bg-white text-indigo-500'
                  >
                    Password
                  </label>
                  <input
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    className={`px-4 pb-2 pt-3 border border-slate-200 w-full ${
                      errors?.password && 'border-red-600'
                    }`}
                    {...register('password', { required: 'Please enter password' })}
                  />
                  {/* input error msg */}
                  {errors?.password && (
                    <p className='text-red-600 tracking-wider ml-4 mt-2'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {/* error undefined (when submit -> email/password wrong -> server error msg) */}
                {errors?.undefined && (
                  <p className='text-red-600 tracking-wider ml-4 mt-2'>
                    {errors.undefined.message}
                  </p>
                )}
                <button
                  type='submit'
                  // onClick={() => setLoginIsOpen(false)}
                  className='bg-indigo-600 text-white hover:bg-indigo-500 mt-6'
                >
                  Login
                </button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default LoginModal
