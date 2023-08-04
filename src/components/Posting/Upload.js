import React from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import "./posting.css";

const FormView = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ PostImage: '', name: '', location: '', description: '' })
  const [url, setUrl] = useState()
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUrl(reader.result)
      }
    } else {
      setUrl('')
    }

  }
  const submitData = (e) => {
    e.preventDefault()
    console.log(data)
    fetch('https://levelbackend.onrender.com/posting/upload', {
      method: "post",
      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify({
        PostImage:url,
        name:data.name,
        location:data.location,
        description:data.description
      })
    }).then(res=>res.json()).then(data=>{
      navigate('/postview')
      console.log(data)
  }).catch(err=>console.log(err))
  }


  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <div>
            <img src="target.jpg" alt="No logo" />
          </div>
          <div className="instaclone">Instaclone</div>
        </div>
        <div className="camera">
          <img src="camera.png" alt="cam" />
        </div>
      </div>


      <div className="formcontainer">
        <form className="formbox" onSubmit={(e) => submitData(e)}>
          <div className="line1">
            <input name="PostImage" onChange={handleImageUpload} type={"file"} id={"file"} />
          </div>
          <div className="line2">
            <input name="name" value={data.name} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type={"text"} placeholder={"Author"} />
            <input name="location" value={data.location} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type={"text"} placeholder={"Location"} />
          </div>
          <div className="line3">
            <input name="description" value={data.description} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} type={"text"} placeholder={"Description"} />
          </div>
          <button className="buttonclass" type={"submit"} >POST</button>
        </form>
      </div>

    </>
  )
}
export default FormView;