import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userimg from "../Images/user.png";
import "./posting.css";
import "./Sidebar.css"

function PostView() {
  const [data, setData] = useState([]);
  const [user, setuser] = useState("");
  const handlelogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    fetch("https://levelbackend.onrender.com/contact/username", {
      method: "get",
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setuser(data.email);
      });
  }, []);

  useEffect(() => {
    const url = "https://levelbackend.onrender.com/posting/alldata";
    const httpObject = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(url, httpObject)
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);
  const navigate = useNavigate();
  const formpage = () => {
    navigate("/formpage");
  };
  return (
    <>
      <div className="postview">
        <div className="navbar">
          <div className="navbar-left">
            <div>
              <img src="target.jpg" alt="No logo" />
            </div>
            <div className="instaclone">Your Blogs</div>
          </div>
          <div className="camera">
            <img src="camera.png" alt="cam" onClick={() => formpage()} />
            <p>Click here to Upload</p>
          </div>
          <div className="user_container">
            <h1>
              <img src={userimg} alt="" />
            </h1>
            <p>{user ? user.split("@")[0].toUpperCase() : " Ram Darvin"}</p>
          </div>
        </div>
        <div className="logout-container">
          <div
            onClick={handlelogout}
            style={{ cursor: "pointer" }}
            className="logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-logout"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
              <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
            </svg>
            <p>Log Out</p>
          </div>
        </div>
        <div className="box">
        {data.map((key) => (
          <div >
            <div className="container">
              <div className="header">
                <div className="left-content">
                  <div id="name">{key.name}</div>
                  <div id="location">{key.location}</div>
                </div>
                <div className="dots">
                  <img src="dots.png" alt="no logo" />
                </div>
              </div>
              <div className="photos">
                <img src={key.PostImage} alt="no-photos" />
              </div>
              <div className="heart">
                <div>
                  <img src="heart-icon.png" alt="no-icon" />
                  <img src="rocket-icon.png" alt="no-icon" />
                </div>
                <div className="date">{key.date}</div>
              </div>
              <div className="likes">{key.likes} likes</div>
              <div className="description">{key.description}</div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
export default PostView;
