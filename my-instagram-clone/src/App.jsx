import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import ForgotPassword from "./Pages/ForgetPassword.jsx";
import Signup from "./Pages/Signup.jsx";
import HomePage from "./Pages/HomePage.jsx";
import ProfilePage from "./Components/ProfilePage.jsx";
import SavedPage from "./Components/SavedPage.jsx";
import SettingsPage from "./Components/SettingsPage.jsx";

import ProfileSidebar from "./Components/ProfileSidebar";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgetpassword" element={<ForgotPassword />} />
                <Route
                    path="/homepage"
                    element={
                        <div className="flex">
                            <ProfileSidebar />
                            <HomePage />
                        </div>
                    }
                />

                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />

                <Route
                    path="/saved"
                    element={
                            <SavedPage />}
                />

                <Route
                    path="/settings"
                    element={<SettingsPage />}
                />
            </Routes>
        </>
    );
}

export default App;
