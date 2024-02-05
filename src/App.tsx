import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage";
import VenuesPage from "./pages/VenuesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppContainer />}>
          <Route path="" element={<LandingPage />} />
          <Route path="profile/login" element={<LoginPage />} />
          <Route path="venues" element={<VenuesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const AppContainer = () => {
  return (
    <>
      <Header />
      <div className="mx-auto lg:max-w-[1800px] flex flex-col min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-80px)] bg-white tracking-wide">
        <div className="py-8 mx-auto xl:max-w-screen-xl lg:py-16 lg:px-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
