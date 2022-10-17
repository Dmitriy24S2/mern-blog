/* eslint-disable multiline-ternary */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Post from '../../components/Post/Post'
import PostSkeleton from '../../components/Post/PostSkeleton'
import Tabs from '../../components/Tabs'
import TagsBlock from '../../components/TagsBlock'
import { fetchPosts, PostType } from '../../redux/slices/postsSlice'
import { RootState, useAppDispatch } from '../../redux/store'

const Home = () => {
  const dispatch = useAppDispatch()

  const { posts } = useSelector((state: RootState) => state.posts)

  // check current logged in user for post author? -> editable posts
  const userData = useSelector((state: RootState) => state.user.userData)
  console.log({ userData })

  // temp
  useEffect(() => {
    console.log('Home posts:', posts)
  }, [posts])

  // fetch posts
  useEffect(() => {
    // console.log('Home useEffect run - fetchPosts', 1111111)
    dispatch(fetchPosts())
  }, [])

  const isPostsLoading = posts.status === 'loading'
  // const finalPosts = posts.items || [...Array(4)]
  // const previewBodyText = !isFullPost && body.length > 50 ? body + '...' : body

  return (
    <div className='home p-4'>
      <Tabs />
      <div className='posts-preview-container flex flex-col-reverse md:grid sm:grid-cols-3 gap-4 md:items-start'>
        <div className='posts-preview-container flex flex-col gap-4 col-span-2'>
          {/* If loading posts -> show posts skeleton */}
          {isPostsLoading &&
            [...Array(4)].map((_item, idx) => <PostSkeleton key={idx} isFullPost={false} />)}
          {/* If have posts -> show posts */}
          {posts?.items.map((item: PostType, index) => {
            // const previewBodyText =
            // item.body.length > 50 ? item.body.substring(0, 100) + '...' : item.body

            return (
              <Post
                key={item._id}
                _id={item._id}
                title={item.title || 'Learn to code #1 | Rock Paper Scissors'}
                body={
                  // preview post body text:
                  // previewBodyText ||
                  // item.body.substring(0, 150) + '...' || // ! markdown transforms '...' text
                  item.body.substring(0, 150) ||
                  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae veniam dignissimos ratione, sequi, explicabo officiis expedita velit temporibus placeat sed, aliquid corrupti vel illo magni delectus voluptate? Cupiditate, magnam blanditiis'
                }
                // process.env.REACT_APP_API_URL
                // ? `http://localhost:4444/${item.imageUrl}` // TODO: ?
                imageUrl={
                  item.imageUrl
                    ? `${process.env.REACT_APP_API_URL}/${item.imageUrl}` // TODO: ?
                    : 'https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
                }
                user={{
                  avatarUrl:
                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                  fullName: item?.user?.fullName || 'John Doe'
                }}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                tags={item.tags}
                isFullPost={false}
                isEditable={userData?._id === item.user._id} // if logged in user same as post author -> enable/show editing
              />
              // "_id": "633c0db4b9888ca0dee235ad",
              // "title": "Post 1",
              // "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae veniam dignissimos ratione, sequi, explicabo officiis expedita velit temporibus placeat sed, aliquid corrupti vel illo magni delectus voluptate? Cupiditate, magnam blanditiis",
              // "tags": [
              //     "react",
              //     "node"
              // ],
              // "viewerCount": 0,
              // "createdAt": "2022-10-04T10:40:52.683Z",
              // "updatedAt": "2022-10-15T06:28:49.054Z",
              // "__v": 0,
              // "user": {
              //     "_id": "633b2144ad263568ee0fff69",
              //     "fullName": "John Doe",
              //     "email": "johndoe@test.com",
              //     "passwordHash": "$2b$10$p5tziVTN2uleAQVDWlkbfehGenWZ4Ua.dP3wDuZ1A4H5FNrlR80.G",
              //     "avatarUrl": "https://www.resetera.com/forums/etcetera-forum.9/z",
              //     "createdAt": "2022-10-03T17:52:04.346Z",
              //     "updatedAt": "2022-10-03T17:52:04.346Z",
              //     "__v": 0
              // },
              // "viewsCount": 49
            )
          })}
        </div>
        <TagsBlock />
      </div>
    </div>
  )
}

export default Home
