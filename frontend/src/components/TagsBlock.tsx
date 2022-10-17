import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { fetchTags } from '../redux/slices/postsSlice'
// import { RootState, useAppDispatch } from '../redux/store'

const TagsBlock = () => {
  // const dispatch = useAppDispatch()

  // const { tags } = useSelector((state: RootState) => state.posts)
  // console.log('fetch tags:', tags)

  // fetch tags
  useEffect(() => {
    // dispatch(fetchTags())
  }, [])

  return (
    <div className='bg-white p-4 shadow-sm rounded'>
      <h3 className='font-bold text-xl mb-5 px-4'>Tags</h3>
      <ul className='flex md:flex-col gap-3'>
        <li>
          <button className='hover:bg-gray-100 w-full text-start'># React</button>
        </li>
        <li>
          <button className='hover:bg-gray-100 w-full text-start'># CSS</button>
        </li>
        <li>
          <button className='hover:bg-gray-100 w-full text-start'># Node</button>
        </li>
      </ul>
    </div>
  )
}

export default TagsBlock
