import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./components/Login/login";
import RegisterPage from "./components/Register/register";
import PostView from "./components/Posting/Postview";
import Upload from "./components/Posting/Upload"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/postview" element={<PostView/>}/>
        <Route path="/formpage" element={<Upload/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
