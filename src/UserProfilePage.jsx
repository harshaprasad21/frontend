import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { doLogout, setUploadImage } from "./slice/UserSlice";
import { Bounce, toast } from "react-toastify";

const UserProfilePage = () => {
  const [uploadImageText, setUploadImageText] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const { S3Url } = useSelector((state) => state.user);
  // console.log("111");
  const s3Imge = S3Url?.s3url;
  // console.log("222");
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [imageUrlPath, setimageUrlPath] = useState([]);

  // const { uploadImage } = useSelector((state) => state?.user);

  // console.log("redux", uploadImage);
  console.log("imgUrlpath--", imageUrlPath);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ip-10-0-139-53.us-east-2.compute.internal/get-upload-image?userId=${userData?._id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const ImageUploadUrl = response?.data?.getUserUploadedUrl;
        console.log('xxx',ImageUploadUrl)
        await dispatch(setUploadImage({ ...ImageUploadUrl }));
        setimageUrlPath(ImageUploadUrl.reverse());
        if (userData == null) {
          return navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (userData?._id) {
      fetchData();
      }
    
  }, [userData?._id, dispatch, navigate]);

  //handleUpload Image
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `https://ip-10-0-139-53.us-east-2.compute.internal/upload-s3-image?userId=${userData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data)
      if (response.data.s3Path) {
        setimageUrlPath((prevImageUrlPath) => [response.data, ...prevImageUrlPath]);
        }
        toast.success('Image Uploaded Successful', {
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
    } catch (error) {
      toast.error('Image Upload Failed', {
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
      console.log("Error in image upload", error);
    }
  };

  const handleLogout=async(e)=>{
    e.preventDefault();
    const logoutRes=await axios.post('https://ip-10-0-139-53.us-east-2.compute.internal/logout',{headers:{'Content-Type': 'application/json'},withCredentials:true});
    dispatch(doLogout());
    toast.success('Logout successful', {
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
      navigate('/');
    }, 2000);
  }
  return (
    <div>
      <nav className="navbar bg-primary sticky-top" data-bs-theme="dark">
        <div className="container-fluid d-flex justify-content-between">
          <div>
            <img
              src={"https://d112kgh6qkdxpd.cloudfront.net/Development/image/logo.gif"}
              alt=""
              style={{ width: "50px", height: "50px", borderRadius: "25px" }}
            />
            <span
              className="mx-3 h3 text-white fw-bold"
              style={{ fontFamily: "Klavika" }}
            >
              x-Factor
            </span>
          </div>
          <div
            onMouseEnter={() => setShowUpdateProfile(true)}
            onMouseLeave={() => setShowUpdateProfile(false)}
          >
            {showUpdateProfile && (
              <div style={{position:'absolute',right:'62px', top:'0px',display:'flex',flexDirection:'column'}} >
                <Link to={"/update-profile"}>
                  <span className="btn btn-primary btn-sm fw-bold ">
                    Update Profile
                  </span>
                </Link>
                <button onClick={handleLogout} className="btn btn-primary btn-sm fw-bold ">
                  <span>Logout</span>
                </button>
              </div>
            )}
            <img
              src={
                s3Imge
                  ? `https://d112kgh6qkdxpd.cloudfront.net/Development${s3Imge}`
                  : "https://d112kgh6qkdxpd.cloudfront.net/Development/image/profile_icon.gif"
              }
              alt="image"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "25px",
                cursor: "pointer",
                objectFit: "cover",
                backgroundSize: "contain",
                fontSize: "10px",
              }}
            />
          </div>
        </div>
      </nav>
      <main>
        <div>
          {imageUrlPath.map((url, index) => (
            <div
              key={index}
              className="container-md text-center d-flex justify-content-center mb-4 mt-3"
            >
              <div className="card my-4" style={{ height: "50vh", width: "60vw" }}>
                <div style={{ width: "100%", height: "100%" }}>
                  {url &&(
                    <img
                    src={`https://d112kgh6qkdxpd.cloudfront.net/Development${url.s3Path}`}
                    className="card-img-top rounded"
                    alt="..."
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    />
                  )}
                  <div className="d-flex mt-2 align-items-end border-bottom">
                    <div className="mb-2">
                      <i
                        className="bi bi-heart mx-2 fs-5 "
                        style={{ fontWeight: 900, color: "red" }}
                      ></i>
                    </div>
                    <div className="mb-2">
                      <i
                        className="bi bi-chat mx-2 fs-5 "
                        style={{ fontWeight: 900, color: "blue" }}
                      ></i>
                    </div>
                    <div className="mb-2">
                      <i
                        className="bi bi-share mx-2 fs-5 "
                        style={{ fontWeight: 900, color: "green" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {imageUrlPath.length === 0 && (
            <div className="container d-flex justify-content-center mt-5">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src="https://media.istockphoto.com/vectors/no-image-available-sign-vector-id1138179183?k=6&m=1138179183&s=612x612&w=0&h=prMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE="
                  className="card-img-top"
                  alt="image"
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-muted">
                    Click{" "}
                    <span>
                      <i
                        className="bi bi-plus-circle"
                        style={{ color: "blue" }}
                      ></i>
                    </span>{" "}
                    to upload image
                  </h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
        <div>
          <label htmlFor="upload-img">
            {uploadImageText && (
              <p
                className=" btn btn-primary text-white"
                style={{
                  position: "absolute",
                  bottom: "109px",
                  right: "40px",
                  fontSize: "12px",
                }}
              >
                Upload Image
              </p>
            )}
            <i
              onMouseEnter={() => setUploadImageText(true)}
              onMouseLeave={() => setUploadImageText(false)}
              className="bi bi-plus-circle text-primary fw-bolder"
              style={{
                position: "absolute",
                bottom: "40px",
                right: "50px",
                fontSize: "70px",
                cursor: "pointer",
              }}
            ></i>
          </label>
          <input
            type="file"
            name="file"
            onChange={handleImageUpload}
            id="upload-img"
            accept="image/*"
            className="d-none"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
