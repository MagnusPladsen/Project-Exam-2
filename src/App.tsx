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
  const screenHeight = window.innerHeight;
  const minBodyHeight = (screenHeight - mobileHeaderHeight).toString() + "px";
  const minDesktopBodyHeight =
    (screenHeight - desktopHeaderHeight).toString() + "px";
  console.log(screenHeight, minBodyHeight);
  //not working
  return (
    <>
      <Header />
      <div
        className={`flex flex-col min-h-[${minBodyHeight}] lg:min-h-[${minDesktopBodyHeight}] bg-background`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
