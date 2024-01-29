import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppContainer />}>
          <Route path="" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const AppContainer = () => {
  return (
    <>
      <Header />
      <div
        className={`pt-10 flex flex-col min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-$80px)] bg-background`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
