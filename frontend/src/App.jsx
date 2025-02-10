import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HowToUse from "./pages/HowToUse";
import About from "./pages/About";
import AllStaff from "./pages/AllStaff";
import ReportAge from "./pages/reports/ReportAge";
import ReportRole from "./pages/reports/ReportRole";
import ReportCity from "./pages/reports/ReportCity";

export const NODE_SERVER_URL = "http://localhost:5000"; // "https://staff-server.vercel.app";//

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<AllStaff />} />
          <Route path="reportAge" element={<ReportAge />} />
          <Route path="reportRole" element={<ReportRole />} />
          <Route path="reportCity" element={<ReportCity />} />
        </Route>
        <Route path="/howuse" element={<HowToUse />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
