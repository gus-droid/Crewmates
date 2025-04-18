import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

function CrewmateDetails() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();
      
      setLoading(false);
      
      if (error) {
        setError('Crewmate not found');
        console.error('Error fetching crewmate:', error);
        return;
      }
      
      setCrewmate(data);
    };

    fetchCrewmate();
  }, [id]);

  if (loading) return <p>Loading crewmate details...</p>;
  if (error) return <p>{error}</p>;
  if (!crewmate) return <p>No crewmate found</p>;

  return (
    <div className="crewmate-details">
      <h2>{crewmate.name} Details</h2>
      
      <div className="detail-card">
        <div className="detail-section">
          <h3>Attributes</h3>
          <ul>
            <li><strong>Attribute 1:</strong> {crewmate.attribute1}</li>
            <li><strong>Attribute 2:</strong> {crewmate.attribute2}</li>
            <li><strong>Attribute 3:</strong> {crewmate.attribute3}</li>
          </ul>
        </div>
        
        <div className="detail-section">
          <h3>Description</h3>
          <p>{crewmate.description || 'No description available'}</p>
        </div>
        
        <div className="detail-section">
          <h3>Created</h3>
          <p>{new Date(crewmate.created_at).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="detail-actions">
        <Link to="/gallery" className="btn">Back to Gallery</Link>
        <Link to={`/update/${crewmate.id}`} className="btn">Edit Crewmate</Link>
      </div>
    </div>
  );
}

export default CrewmateDetails;