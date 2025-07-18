import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { VideoLibraryHome } from "./components/video-library-home";
import { UserRegister } from "./components/user-register";
import { UserLogin } from "./components/Login";
import { UserDashBoard } from "./components/user-dashboard";
import { UserLoginError } from "./components/user-login-error";
import { AdminLogin } from "./components/admin-login";
import { AdminDashBoard } from "./components/admin-dashboard";
import { AddVideo } from "./components/add-video";
import { EditVideo } from "./components/edit-video";
import { DeleteVideo } from "./components/delete-video";

function App() {
 
return (
  <div className="container-fluid">
    <BrowserRouter>
      <header className="bg-dark text-white p-2">
        <h1 className="text-center"><Link to="/" className="btn btn-dark">video Library Home</Link> </h1>

      </header>
      <section className="mt-5">
        <Routes>
          <Route path="/" element={<VideoLibraryHome />} />
          <Route path="user-register" element={<UserRegister />} />
          <Route path="user-login" element={<UserLogin />} />
          <Route path="user-dashboard" element={<UserDashBoard />} />
          <Route path="user-login-error" element={<UserLoginError />}></Route>
          <Route path="admin-login" element={<AdminLogin />}></Route>
          <Route path="admin-dashboard" element={<AdminDashBoard />}></Route>
          <Route path="add-video" element={<AddVideo />}></Route>
          <Route path="edit-video/:id" element={<EditVideo />}></Route>
          <Route path="delete-video/:id" element={<DeleteVideo />}></Route>
        </Routes>
      </section>
    </BrowserRouter>
  </div>
)
}

export default App
