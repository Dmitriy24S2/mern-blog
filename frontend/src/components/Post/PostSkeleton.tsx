import React from 'react'

const PostSkeleton = ({ isFullPost }: { isFullPost: boolean }) => {
  return (
    <article className={`bg-white rounded shadow-sm ${isFullPost ? 'mt-12' : ''}`}>
      {/* post image */}
      <div
        // className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
        className='image w-full h-full min-h-[275px] max-h-[324px] object-cover bg-slate-300'
      />
      {/* post user & text */}
      <div className='post-content p-6 flex items-start'>
        <div className='avatar bg-slate-300  rounded-full min-h-[2rem] min-w-[2rem] mt-1.5 mr-3.5'></div>
        <div className='container flex flex-col gap-7 w-full'>
          <div className='blog-top mb-1'>
            <div className='name bg-slate-300 h-5 w-32 mb-2 rounded'></div>
            <div className='time bg-slate-300 h-5 w-40 rounded'></div>
          </div>
          <div className='title h-8 w-72 bg-slate-300 rounded'></div>
          <div className='body-text bg-slate-300 h-14 w-full rounded'></div>
          <div className='tags'>
            <div className='list flex gap-4 flex-wrap'>
              {[...Array(3)].map((_tag, idx) => (
                <div key={idx} className='bg-slate-300 w-12 h-6 rounded'></div>
              ))}
            </div>
          </div>
          <div className='blog-bottom flex gap-4'>
            <div className='view count bg-slate-300 w-8 h-5 rounded'></div>
            <div className='comments bg-slate-300 w-8 h-5 rounded'></div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostSkeleton
