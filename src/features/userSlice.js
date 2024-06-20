import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: null,
        username: null,
        email: null,
        createdAt: null,
        updatedAt: null,
        token: null
    },
    reducers:{
        setUserInfo: (state,action)=>{
            state._id = action.payload._id;
            state.email= action.payload.email;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        logOutUser: (state)=>{
            state._id = null;
            state.email= null;
            state.createdAt = null;
            state.updatedAt = null;
            state.username = null;
            state.token = null;
        }
    }
})

export const {setUserInfo,logOutUser}  = userSlice.actions;
export default userSlice.reducer