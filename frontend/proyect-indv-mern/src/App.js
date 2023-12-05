import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/registerPage/registerPage";
import LoginPage from "./pages/loginPage/loginPage";
import HomePage from "./pages/homePage/homePage";
import OderPage from "./pages/oderPage/oderPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage></RegisterPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/order" element={<OderPage></OderPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
