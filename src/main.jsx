import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Register from './Register.jsx';
import UserProfilePage from './UserProfilePage.jsx';
import UpdateProfile from './UpdateProfile.jsx';
import {Provider} from 'react-redux'
import store from './store.js';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomePage/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/home' element={<UserProfilePage/>} />
      <Route path='/update-profile' element={<UpdateProfile/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
)
