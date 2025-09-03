import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotConnected from "./pages/NotConnected";
import Connected from "./pages/Connected";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/not-connected" element={<NotConnected />} />
      <Route path="/connected" element={<Connected />} />
    </Routes>
  );
}

export default App;
