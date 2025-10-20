import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Импортируем Layout
import Home from "./pages/Home/index";
import FittingRoom from "./pages/FittingRoom";
import Chat from "./pages/Chat";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fitting-room" element={<FittingRoom />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
