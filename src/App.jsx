import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateCrewmate from './pages/CreateCrewmate';
import CrewmateGallery from './pages/CrewmateGallery';
import CrewmateDetails from './pages/CrewmateDetails';
import UpdateCrewmate from './pages/UpdateCrewmate';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<CrewmateGallery />} />
            <Route path="/crewmate/:id" element={<CrewmateDetails />} />
            <Route path="/update/:id" element={<UpdateCrewmate />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;