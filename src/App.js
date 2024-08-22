import RoutesSystem from "./routes/routes";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<RoutesSystem />} />
          </Routes>
        </AuthProvider>
      </Router>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<RoutesSystem />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;