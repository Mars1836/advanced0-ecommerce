import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import withAuth from "./hoc/withAuth";
import HomePage from "./pages/home/HomePage";

import withoutAuth from "./hoc/withoutAuth";
import Init from "./wapper_components/Init";
import { useEffect } from "react";

function App() {
  const HomePageWithAuth = withAuth(HomePage);
  const LoginPageWithoutAuth = withoutAuth(LoginPage);
  useEffect(() => {
    console.log(import.meta.env.VITE_REACT_APP_TEST);
  }, []);

  return (
    <>
      <Init>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPageWithoutAuth />}></Route>
            <Route path="/" element={<HomePageWithAuth />}></Route>
            <Route path="/*" element={<p>NOt found page</p>}></Route>
          </Routes>
        </BrowserRouter>
      </Init>
    </>
  );
}

export default App;
