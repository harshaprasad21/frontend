import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
    S3Url:localStorage.getItem('s3urldata') ? JSON.parse(localStorage.getItem('s3urldata')) : null,
    uploadImage:localStorage.getItem('upload-img') ? JSON.parse(localStorage.getItem('upload-img')) : null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
            setUserData:(state, action) => 
            {
                state.userData = action.payload;
                localStorage.setItem('userData', JSON.stringify(action.payload))
            },
            setS3Url:(state,action)=>
            {
               state.S3Url=action.payload;
               localStorage.setItem('s3urldata',JSON.stringify(action.payload))
               
            },
            removeS3Url:(state,action)=>{
                state.S3Url=null,
                localStorage.removeItem('s3urldata');
            },
            doLogout:(state,action)=>{
                state.S3Url=null,
                state.userData=null;
                localStorage.removeItem('s3urldata');
                localStorage.removeItem('userData');
                localStorage.removeItem('upload-img');
            },
            setUploadImage:(state,action)=>{
                state.uploadImage=action.payload;
                localStorage.setItem('upload-img',JSON.stringify(action.payload))
            }
    }
});


export const {setUserData,setS3Url,removeS3Url,doLogout,setUploadImage}=userSlice.actions;
export default userSlice.reducer;