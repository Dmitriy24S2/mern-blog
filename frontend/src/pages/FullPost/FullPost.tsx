import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from '../../axios/axios'
import Post from '../../components/Post/Post'
import PostSkeleton from '../../components/Post/PostSkeleton'
import { PostType } from '../../redux/slices/postsSlice'
import { RootState } from '../../redux/store'

const FullPost = () => {
  const params = useParams()
  console.log(params) // {id: '0'}

  const [fullPostData, setFullPostData] = useState<PostType>()
  const [isLoading, setIsLoading] = useState(true)

  // check current logged in user -> is post author? -> editable post
  const userData = useSelector((state: RootState) => state.user.userData)
  console.log({ userData })

  useEffect(() => {
    const fetchSinglePostData = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`/posts/${params.id}`)
        console.log(data)
        setFullPostData(data)
        // body: '444 3333body body body3'
        // createdAt: '2022-10-04T10:40:52.683Z'
        // tags: (2)[('hi', 'boo')]
        // title: '444 333Title title title3'
        // updatedAt: '2022-10-08T09:55:22.200Z'
        // user: '633b2144ad263568ee0fff69'
        // viewerCount: 0
        // viewsCount: 4
        // __v: 0
        // _id: '633c0db4b9888ca0dee235ad'
      } catch (error) {
        alert('Failed to load post')
        console.log(error)
      }
      setIsLoading(false)
    }
    fetchSinglePostData()
  }, [])

  // const isPostsLoading = !fullPostData

  return (
    <>
      {/* if loading -> show skeleon */}
      {isLoading && <PostSkeleton isFullPost={true} />}
      {/* if have post data -> show post */}
      {fullPostData && (
        <Post
          _id={fullPostData._id}
          title={fullPostData.title}
          body={
            fullPostData.body ||
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae veniam dignissimos ratione, sequi, explicabo officiis expedita velit temporibus placeat sed, aliquid corrupti vel illo magni delectus voluptate? Cupiditate, magnam blanditiis'
          }
          // process.env.REACT_APP_API_URL
          // ? `http://localhost:4444/${fullPostData.imageUrl}` // TODO: ?
          imageUrl={
            fullPostData.imageUrl
              ? `${process.env.REACT_APP_API_URL}/${fullPostData.imageUrl}` // TODO: ?
              : 'https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
          }
          user={{
            avatarUrl:
              'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
            fullName: fullPostData?.user?.fullName || 'John Doe'
            //  TODO: name data?
            // ...fullPostData.user // ! repeat overlap this way?
          }}
          createdAt={fullPostData.createdAt}
          viewsCount={fullPostData.viewsCount}
          tags={fullPostData.tags}
          isFullPost={true}
          isEditable={userData?._id === fullPostData.user._id} // if logged in user same as post author -> enable/show editing
        />
      )}
    </>
  )
}

export default FullPost
