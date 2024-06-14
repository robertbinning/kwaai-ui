import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import BotsList from "./pages/botsList/botsList";
import { BotsProvider } from "./context/botsContext";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <BotsProvider>
      <Router>
        <Routes>
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          } />
          <Route path="/List" element={
            <PrivateRoute>
              <BotsList />
            </PrivateRoute>
          } />
          <Route path="/Home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </BotsProvider>
  );
}

export default App;
