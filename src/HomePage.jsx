import React, { useEffect, useRef } from "react";
import SignIn from "./SignIn";

const HomePage = () => {
  return (
    <div>
      <div className="row" style={{ height: "100vh", width: "100vw" }}>
        <div className="col-7">
          <img
            src="https://d112kgh6qkdxpd.cloudfront.net/Development/image/Login.gif"
            loop
            autoPlay
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-5">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
