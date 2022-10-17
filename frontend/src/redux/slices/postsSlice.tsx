// import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/axios'

export interface PostType {
  _id: string
  title: string
  body: string
  imageUrl: string
  user: {
    avatarUrl: string
    fullName: string
    _id?: string
  }
  createdAt: string
  viewsCount: number
  tags: string[]
  isFullPost: boolean
  isEditable: boolean
}

export interface PostsSliceInitialStateType {
  posts: {
    items: PostType[]
    status: string
  }
  tags: {
    items: string[]
    status: string
  }
}

const initialState: PostsSliceInitialStateType = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  }
}

export const fetchPosts = createAsyncThunk<PostType[]>('posts/fetchPosts', async () => {
  const { data }: { data: PostType[] } = await axios.get('/posts')
  console.log('async fetch redux slice', data)
  return data
})

// ! NO TYPE ERRORS?
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/posts')
  console.log('async fetch redux slice', data)
  return data
})

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id: string) => {
    const { data } = await axios.delete(`/posts/${id}`)
    console.log('async delete post data', data)
    // {success: true, message: 'post deleted', id: '6349710a61699bf7a6e17614'}
  }
  // async (id: string) => await axios.delete(`/posts/${id}`)
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    // fetchPosts
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const data: PostType[] = [...action.payload]
      state.posts.items = data
      console.log('fetch posts redux', data, 111111)
      state.posts.status = 'done'
    })
    // fetchTags
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      const data = [...action.payload]
      state.tags.items = data
      state.tags.status = 'done'
    })
    // fetchRemovePost
    builder.addCase(fetchRemovePost.fulfilled, (state, action) => {
      console.log('postsSlice DELETING POST?', 'action:', action)
      // {
      //     "type": "posts/fetchRemovePost/fulfilled",
      //     "meta": {
      //         "arg": "6349710a61699bf7a6e17614", // this is post id?
      //         "requestId": "b1Ge3fDomXLdrSB_jr3xa",
      //         "requestStatus": "fulfilled"
      //     }
      // }
      // payload undefined?
      const id = String(action.meta.arg)
      state.posts.items = state.posts.items.filter((item) => item._id !== id)
    })
  }
})

// Action creators are generated for each case reducer function
// export const {fetchPosts} = postsSlice.actions
export default postsSlice.reducer
