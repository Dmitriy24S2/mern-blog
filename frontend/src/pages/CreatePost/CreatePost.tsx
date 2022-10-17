import 'easymde/dist/easymde.min.css'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'
import axios from '../../axios/axios'
import { checkIsAuth } from '../../redux/slices/authSlice'
import { RootState } from '../../redux/store'

const CreatePost = () => {
  // check for post id -> get post data -> edit post mode
  const { id } = useParams()
  console.log('useparams id:', id)
  const isEditing = Boolean(id)

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [body, setBody] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // handle image upload -> send to server
  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files)
    // FileList
    // 0: File {name: "0.jpeg", lastModified: 1658659638000, webkitRelativePath: "", size: 1790, type: "image/jpeg", …}
    try {
      if (event.target.files) {
        const formData = new FormData()
        const imgFile = event.target.files[0]
        formData.append('image', imgFile)
        // console.log('formData:', formData)
        // [Log] formData: (CreatePost.tsx, line 38) FormData No Properties  FormData Prototype
        const { data } = await axios.post('/upload', formData) // will recieve link to uploaded file from backend
        // console.log('await data:', data)
        // [Log] await data: – {url: "uploads/0.jpeg"} (CreatePost.tsx, line 42)
        setImageUrl(data.url)
        // console.log({ imageUrl }) // {imageUrl: "uploads/1.jpg"}
      }
    } catch (error) {
      console.warn('image upload catch error:', error)
      alert('Error when uploading image')
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const splitTags = tags.split(',').map((element) => element.trim()) // split string into separate tags & remove white space
  console.log(splitTags) // ["test", "fdkflsmdf  fsdm", "fsdf sdfds", "fsdf s", "df"] (5)
  //   [Log] ["test 5", "test 5", "test5"] (3) (CreatePost.tsx, line 54)

  const handleSubmit = async () => {
    try {
      const fields = {
        title,
        tags: splitTags,
        body,
        imageUrl
      }

      console.log('fields', { fields })
      //   fields: Object
      //   body: 'text 4'
      //   imageUrl: ''
      //   tags: ['test', 'fdkflsmdf fsdm', 'fsdf sdfds', 'fsdf s', 'df', 'fdfdfdfdfdf'](6)
      //   title: 'test 4'

      setIsLoading(true)
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields)

      console.log('data submit await', data)
      //   [Log] data submit await – {success: true, post: Object}
      // {success: true, post: Object}
      //   post: {title: "Title 2", body: "Body Text 2", user: "6346935cdc974e1cc7cda2e9", tags: ["tag 2"], imageUrl: "uploads/1.jpg", …}

      // Get id of new post -> redirect to post page with this id
      // const postId = data.post._id
      const postId = isEditing ? id : data.post._id
      navigate(`/posts/${postId}`)
    } catch (error) {
      setIsLoading(false)
      console.warn('submit catch error:', error)
      // ! when only title and tags text error in console example:
      // Failed to load resource: the server responded with a status of 400 (Bad Request)
      // response: Object
      // config: {transitional: {silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false}, adapter: function, transformRequest: Array, transformResponse: Array, timeout: 0, …}
      // data: Array (1)
      // 0 {value: "", msg: "Enter body text", param: "body", location: "body"}
      alert('Error when submitting post')
    }
  }

  const onChange = React.useCallback((value: string) => {
    setBody(value)
  }, [])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'abc'
      }
    }),
    []
  )

  // If not logged in -> redirect to home page (cant create new posts)
  const isAuth = useSelector(checkIsAuth)

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />
  }

  isLoading && (
    <h2 className='mx-auto font-extrabold text-3xl text-indigo-600 tracking-wide mb-8'>
      Submitting Post
    </h2>
  )

  // check current user for editable posts
  const userData = useSelector((state: RootState) => state.user.userData)
  console.log({ userData })

  // on load if id exists -> edit post mode -> fill in values from existing post
  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then((res) => {
        console.log('res exisitng post', res)
        // if not author of posts (e.g. manual url edit link to access edit page) -> redirect to home page
        if (userData?._id !== res.data.user._id) {
          console.log('user id ? post user id', userData?._id !== res.data.user._id)
          navigate('/')
        }
        // {data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…},…}
        // data:
        //     "_id": "63491375fa8daab6f17588ec",
        //     "title": "Title 2",
        //     "body": "Body Text 2",
        //     "user": {
        //         "_id": "6346935cdc974e1cc7cda2e9",
        //         "fullName": "john doe3",
        //         "email": "johndoe3@test.com",
        //         "passwordHash": "$2b$10$p4LSmSvphTognfUSCTbz1OvDPVY1pkfP6KsWs7fKW.z76BC6r4k6u",
        //         "createdAt": "2022-10-12T10:13:48.219Z",
        //         "updatedAt": "2022-10-12T10:13:48.219Z",
        //         "__v": 0
        //     },
        //     "tags": [
        //         "tag 2"
        //     ],
        //     "imageUrl": "uploads/1.jpg",
        //     "viewsCount": 12,
        //     "createdAt": "2022-10-14T07:44:53.435Z",
        //     "updatedAt": "2022-10-15T20:31:14.062Z",
        //     "__v": 0
        // }
        setImageUrl(res.data.imageUrl)
        setTitle(res.data.title)
        // setTags(res.data.tags) // Uncaught TypeError: tags.split is not a function
        setTags(res.data.tags.join(', '))
        setBody(res.data.body)
      })
    }
  }, [])

  return (
    <form
      className='flex flex-col gap-3 mt-10 mb-20 bg-white px-8 py-10'
      onSubmit={(e) => {
        e.preventDefault()
        console.log({ title, tags, body })
        handleSubmit()
      }}
    >
      <h2 className='mx-auto font-extrabold text-3xl text-indigo-600 tracking-wide mb-8'>
        Create Post
      </h2>
      {/* Image upload */}
      <h4 className='ml-4 font-extrabold text-indigo-600'>Cover Image</h4>
      <div className='mb-4 flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <input
            type='file'
            name='file'
            id='photo-upload'
            placeholder='Upload your photo'
            hidden
            ref={fileInputRef}
            onChange={handleChangeFile}
          />
          {/* Add img */}
          <button
            type='button'
            className='bg-white border border-indigo-600 text-indigo-600 hover:text-indigo-400 hover:border-indigo-400'
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click()
              }
            }}
          >
            Upload
          </button>
          {/* <p id='file-chosen'>Upload your photo</p> */}
        </div>
        {/* Remove img */}
        {imageUrl && (
          <button
            type='button'
            onClick={onClickRemoveImage}
            className='bg-white border border-slate-400 text-gray-500 hover:text-black'
          >
            Remove
          </button>
        )}
      </div>
      {/* Image */}
      {imageUrl && (
        // process.env.REACT_APP_API_URL
        // <img src={`http://localhost:4444/${imageUrl}`} alt='Uploaded' className='min-h-[300px]' />
        <img
          src={`${process.env.REACT_APP_API_URL}/${imageUrl}`}
          alt='Uploaded'
          className='min-h-[300px]'
        />
      )}
      {/* Title */}
      <h4 className='ml-4 font-extrabold text-indigo-600'>Title</h4>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='border-slate-300 border px-4 py-3 rounded mb-4'
        required
      />
      {/* Tags */}
      <h4 className='ml-4 font-extrabold text-indigo-600'>Tags</h4>
      <input
        type='text'
        name='tags'
        placeholder='Tags'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className='border-slate-300 border px-4 py-3 rounded mb-4'
      />
      {/* Body */}
      <h4 className='ml-4 font-extrabold text-indigo-600'>Body</h4>
      <SimpleMDE value={body} onChange={onChange} options={options} />
      <div className='flex gap-3 justify-end mt-8'>
        <button
          type='button'
          className='bg-white border border-slate-400 text-gray-500 hover:text-black'
        >
          Cancel
        </button>
        <button className='bg-indigo-600 text-white hover:bg-indigo-700' type='submit'>
          {isEditing ? 'Update Post' : 'Add Post'}
          {/* Add Post */}
        </button>
      </div>
    </form>
  )
}

export default CreatePost
