import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import { useSelector } from "react-redux";
import NotAuthorized from "./pages/NotAuthorized";

function App() {
  const isAuthenticated = useSelector((state) => state.access != null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <MainPage /> : <NotAuthorized />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
