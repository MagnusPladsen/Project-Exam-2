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

      <Outlet context="mx-auto lg:max-w-[1800px] flex flex-col min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-80px)] bg-background lg:p-8 tracking-wide" />

      <Footer />
    </>
  );
};

export default App;
