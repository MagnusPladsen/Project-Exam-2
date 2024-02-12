import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/header/Header";
import AuthRoute from "./utils/authWrapper";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import VenuesPage from "./pages/VenuesPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <AuthRoute>
        <Routes>
          <Route path="" element={<LandingPage />} />
          {/* Routes with header and footer */}
          <Route path="/*" element={<AppContainer />}>
            <Route path="login" element={<LoginPage />} />

            {/* Routes that require authentication */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="venues" element={<VenuesPage />} />
          </Route>
        </Routes>
      </AuthRoute>
    </BrowserRouter>
  );
}

const AppContainer = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
