import axios from "axios";
axios.defaults.withCredentials = true
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast,Bounce } from "react-toastify";
import { setS3Url, setUserData } from "./slice/UserSlice";

const Register = () => {

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleShowUpdateButton=(e)=>{
    setShowUpdateButton(true);
  }
  //
  const  data={
    firstname,
    lastname,
    email,
    password
  }
  const navigate= useNavigate();
  const dispatch=useDispatch();
  const {userData}=useSelector((state)=>state.user);
  const userID=userData?._id;

useEffect(() => {
    // console.log(userID);
    if(userData==null){
      return navigate('/')
    }
    setFirstName(userData?.firstname)
    setLastName(userData?.lastname)
    setEmail(userData?.email)
    setPassword(userData?.password)
}, [userData?.firstname,userData?.lastname,userData?.email,userData?.password]);

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
      const response=await axios.put(`internal-APP-ASG-LB-2017550769.us-east-2.elb.amazonaws.com/update/${userID}`,data,{headers:{'Content-Type': 'application/json'},withCredentials: true});
      console.log(response);
      await dispatch(setUserData({...response.data.updatedUser}));
      toast.success('Profile Updated successful', {
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
          navigate('/home')
        }, 4000);
      } catch (error) {
        toast.error('Server Error ', {
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
  const [profilePic, setProfilePic] = useState(null);
  const {S3Url}=useSelector((state)=>state?.user);
  const s3UserId=S3Url?.userid;
  const s3Img=S3Url?.s3url;
  // console.log(s3Img)
  const handleImgChange = async (e) => {
    const file = e.target.files[0]; 
    // setProfilePic(file);
    const formData = new FormData();
    formData.append('file', file);
    try {
      let uploadedUrl='internal-APP-ASG-LB-2017550769.us-east-2.elb.amazonaws.com/upload';
      if(s3UserId){
        uploadedUrl += `/${s3UserId}`
      }
      const result = await axios.post(uploadedUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      // console.log(result)
      await dispatch(setS3Url({...result.data}));
      toast.success('Profile Image Updated Successful', {
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
      // console.log('Response:', result.data);
    } catch (error) {
      toast.success('Server Error', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
      console.error('Error:', error);
    }
  };


  const handleLogout=(e)=>{
    e.preventDefault();
    setTimeout(() => {
      navigate('/home')
    }, 1000);
  }
  return (
    
    <div
      className="container-fluid"
      style={{ backgroundColor: "#dfe7fd", width: "100vw", height: "100vh" }}
    >
      <div className="container-md d-flex justify-content-center">
        <div
          className="card mt-3 rounded"
          style={{ height: "90vh", width: "30vw", backgroundColor: "#edf6f9" }}
          >
          <div className="d-flex flex-column justify-content-center align-items-center mb-2" style={{width:'100%',objectFit:'cover'}}>
            <h1 className="h4 text-center my-3">Profile</h1>
            <label htmlFor="profile-pic" style={{cursor:'pointer'}}>
            <img src={s3Img ? `https://d112kgh6qkdxpd.cloudfront.net/Development${s3Img}` : `https://d112kgh6qkdxpd.cloudfront.net/Development/image/profile_icon.gif`} alt="Profile pic" style={{height:'120px',width:'120px',borderRadius:'60%',objectFit:'cover',fontSize:'10px'}} />
            </label>
            <input type="file" name="file" onChange={handleImgChange} accept='image/*'   id="profile-pic" className="d-none" />
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
                  onChange={(e)=>{setFirstName(e.target.value);handleShowUpdateButton();}}
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
                  onChange={(e)=>{setLastName(e.target.value);handleShowUpdateButton();}}
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
                  onChange={(e)=>{setEmail(e.target.value);handleShowUpdateButton();}}
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
                  onChange={(e)=>{setPassword(e.target.value);handleShowUpdateButton();}}
                />
              </div>
              <div className="d-flex justify-content-between">
              <span className="btn btn-primary" onClick={handleLogout} style={{fontFamily:'Hind Siliguri',fontWeight:500,backgroundColor:'#1d3557'}}>Home</span>
              {showUpdateButton &&(
                <button type="submit" className="btn btn-primary" style={{fontFamily:'Hind Siliguri',fontWeight:500,backgroundColor:'#1d3557'}} >
                Update
              </button>
              )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
