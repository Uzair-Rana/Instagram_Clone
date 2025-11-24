import {Route, Routes} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import ForgotPassword from "./Pages/ForgetPassword.jsx";
import Signup from "./Pages/Signup.jsx";
import HomePage from "./Pages/HomePage.jsx";
function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/forgetpassword" element={<ForgotPassword />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/homepage" element={<HomePage />}/>

        </Routes>
    </>
  )
}

export default App
