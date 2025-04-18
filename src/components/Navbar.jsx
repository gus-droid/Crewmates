import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Crewmates</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Crewmate</Link>
        <Link to="/gallery">Crewmate Gallery</Link>
      </div>
    </nav>
  );
}

export default Navbar;