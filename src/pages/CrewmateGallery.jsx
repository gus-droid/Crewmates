import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import CrewStatistics from '../components/CrewStatistics';

function CrewmateCard({ crewmate }) {
  return (
    <div className="crewmate-card">
      <h3>{crewmate.name}</h3>
      <div className="attributes">
        <p>{crewmate.attribute1}</p>
        <p>{crewmate.attribute2}</p>
        <p>{crewmate.attribute3}</p>
      </div>
      <div className="card-actions">
        <Link to={`/crewmate/${crewmate.id}`} className="btn">Details</Link>
        <Link to={`/update/${crewmate.id}`} className="btn">Edit</Link>
      </div>
    </div>
  );
}

function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false });
      
      setLoading(false);
      
      if (error) {
        console.error('Error fetching crewmates:', error);
        return;
      }
      
      setCrewmates(data || []);
    };

    fetchCrewmates();
  }, []);

  return (
    <div className="crewmate-gallery">
      <h2>Your Crew</h2>
      
      {crewmates.length > 0 && (
        <CrewStatistics crewmates={crewmates} />
      )}
      
      {loading ? (
        <p>Loading crewmates...</p>
      ) : crewmates.length === 0 ? (
        <div className="empty-gallery">
          <p>Your crew is empty! Create some crewmates to see them here.</p>
          <Link to="/create" className="btn">Create a Crewmate</Link>
        </div>
      ) : (
        <div className="crewmate-grid">
          {crewmates.map(crewmate => (
            <CrewmateCard key={crewmate.id} crewmate={crewmate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CrewmateGallery;