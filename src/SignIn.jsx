import React, { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import axios from 'axios';
import { toast ,Bounce} from "react-toastify";
import { useDispatch } from "react-redux";
import { setS3Url, setUserData } from "./slice/UserSlice";
const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const dispatch=useDispatch()
  const navigate=useNavigate();

  const data={
    email,
    password
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.post('internal-APP-ASG-LB-2017550769.us-east-2.elb.amazonaws.com/login',data,{headers:{'Content-Type': 'application/json'},withCredentials: true});
      toast.success('Login successful', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        const userRefId=response?.data?.userdata?._id;
      const getS3Url=await axios.get(`internal-APP-ASG-LB-2017550769.us-east-2.elb.amazonaws.com/getS3Url?userRefId=${userRefId}`,{headers:{'Content-Type': 'application/json'}});
      await dispatch(setS3Url({...getS3Url.data[0]}))
      const getUserData=await axios.get(`internal-APP-ASG-LB-2017550769.us-east-2.elb.amazonaws.com/getUserData?userId=${userRefId}`,{headers:{'Content-Type': 'application/json'}});
      dispatch(setUserData({...getUserData.data.user}))
      // console.log(getUserData);
      setTimeout(() => {
        navigate('/home')
      }, 4000);
    } catch (error) {
      toast.error('Login Failed', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
  }
  return (
    <>
      <div className="card" style={{marginTop:'140px'}} >
        <div className="card-body">
          <h6 className="mb-2 h1 fw-bold mb-5">Login</h6>
          <form onSubmit={handleSubmit}>
            <div>
              <i className="bi bi-envelope mx-2 fs-5 text-muted"></i>
              <label htmlFor="exampleInputEmail1" className="form-label" style={{fontSize:'18px'}}>
                Email 
              </label>
              <input
                type="email"
                className="form-control mb-4"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <i className="bi bi-key mx-2 fs-5 text-muted mt-3"></i>
              <label htmlFor="exampleInputPassword1" className="form-label" style={{fontSize:'18px'}}>
                Password
              </label>
              <input
                type="password"
                className="form-control mb-4"
                id="exampleInputPassword1"  
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required={true}
              />
            </div>
            <button type="submit" className="btn mb-4 fw-bold" style={{backgroundColor:'#d1b3c4',color:'white'}}>
              Submit
            </button>
          </form>
          Don't have an account?
          <Link to="/register" className="card-link mx-2 fw-medium" style={{color:'#735d78'}}>
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
