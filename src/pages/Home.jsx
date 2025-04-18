import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h2>Welcome to Crewmates</h2>
      <p>Build and manage your crew with custom attributes!</p>
      <div className="home-links">
        <Link to="/create" className="btn">Create a Crewmate</Link>
        <Link to="/gallery" className="btn">View Your Crew</Link>
      </div>
    </div>
  );
}

export default Home;