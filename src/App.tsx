import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header, {
  mobileHeaderHeight,
  desktopHeaderHeight,
} from "./components/header/Header";
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
        className={`flex flex-col min-h-[calc(100vh-${mobileHeaderHeight})] lg:min-h-[calc(100vh-${desktopHeaderHeight})] bg-background`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
