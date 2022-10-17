import React from 'react'

const Tabs = () => {
  return (
    <div className='flex gap-4 mb-6'>
      <button className='rounded-none border-0 border-b-2 border-indigo-500 text-indigo-500 hover:text-indigo-400'>
        New
      </button>
      <button className='rounded-none border-0 hover:text-indigo-400'>Popular</button>
    </div>
  )
}

export default Tabs
