import './App.css';
import HomePage from './components/home';
import CharDetail from './components/char-detail';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="charDetail" element={<CharDetail />} />
      </Routes>
    </div>
  );
}

export default App;
