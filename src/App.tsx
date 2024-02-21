import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer.component";
import Header from "./components/header/Header.component";
import AuthRoute from "./utils/authWrapper";
import LandingPage from "./pages/Landing.page";
import LoginPage from "./pages/Login.page";
import VenuesPage from "./pages/Venues.page";
import ProfilePage from "./pages/Profile.page";
import SingleVenuePage from "./pages/SingeVenue.page";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <AuthRoute>
        <ScrollToTop />
        <Routes>
          <Route path="" element={<LandingPage />} />
          {/* Routes with header and footer */}
          <Route path="/*" element={<AppContainer />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="venues" element={<VenuesPage />} />
            <Route path="venues/:id" element={<SingleVenuePage />} />

            {/* Routes that require authentication */}
            <Route path="profile/:name" element={<ProfilePage />} />
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
