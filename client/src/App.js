import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./views/Login/LoginPage/LoginPage";
import { SignupPage } from "./views/Signup/SignupPage/SignupPage";
import { IndexPage } from "./IndexPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
