import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";

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
    <div>
      {/* <Header /> */}
      <div className="flex flex-col">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
