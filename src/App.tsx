import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/header/Header";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import VenuesPage from "./pages/VenuesPage";
import AuthRoute from "./utils/authRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/*" element={<AppContainer />}>
          <Route path="profile/login" element={<LoginPage />} />
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
      {/* <div className="mx-auto lg:max-w-[1800px] flex flex-col min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-80px)] bg-white tracking-wide"> */}
      <Outlet />
      {/*  </div> */}
      <Footer />
    </>
  );
};

export default App;
