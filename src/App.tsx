import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/header/Header";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import VenuesPage from "./pages/VenuesPage";
import AuthRoute from "./utils/authRoute";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/*" element={<AppContainer />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<AuthRoute />}>
            <Route index element={<ProfilePage />} />
          </Route>
          <Route path="venues" element={<AuthRoute />}>
            <Route index element={<VenuesPage />} />
          </Route>
        </Route>
      </Routes>
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
