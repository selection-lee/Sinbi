import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./features/MainPage/MainPage";
import User from "./features/User/User";

// function App() {
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/signup" element={<User />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
