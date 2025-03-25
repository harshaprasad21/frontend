import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast,Bounce } from "react-toastify";
import { removeS3Url, setUserData } from "./slice/UserSlice";

const Register = () => {

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//
  const  data={
    firstname,
    lastname,
    email,
    password
  }
  const navigate= useNavigate();
  const dispatch=useDispatch();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!firstname || !lastname ||!email ||!password){
      return  toast.error('Please fill all the fields ', {
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
    try {
      const response=await axios.post('https://api.cloudchampion.online/register',data,{headers:{'Content-Type': 'application/json'}});
      await dispatch(setUserData({...response.data.user}));
      await dispatch(removeS3Url());
        toast.success('Registration successful', {
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
        setTimeout(() => {
          navigate('/')
        }, 4000);

    } catch (error) {
      toast.error('Email ID already exists ', {
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
    <div
      className="container-fluid"
      style={{ backgroundColor: "#dfe7fd", width: "100vw", height: "100vh" }}
    >
      <div className="container-md d-flex justify-content-center">
        <div
          className="card mt-5 rounded"
          style={{ height: "80vh", width: "30vw", backgroundColor: "#edf6f9" }}
        >
          <div className="d-flex justify-content-center mt-5" style={{width:'100%',height:'100%',objectFit:'cover'}}>
            <img src="https://d112kgh6qkdxpd.cloudfront.net/Development/image/logo.gif" alt="" style={{height:'100px',width:'100px',borderRadius:'50%'}} />
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label" style={{fontFamily:'Hind Siliguri',fontWeight:500}}>
                 First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={firstname}
                  onChange={(e)=>setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label" style={{fontFamily:'Hind Siliguri',fontWeight:500}}>
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  value={lastname}
                  onChange={(e)=>setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label" style={{fontFamily:'Hind Siliguri',fontWeight:500}}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail3"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" style={{fontFamily:'Hind Siliguri',fontWeight:500}}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary" style={{fontFamily:'Hind Siliguri',fontWeight:500,backgroundColor:'#1d3557'}} >
                Submit
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
