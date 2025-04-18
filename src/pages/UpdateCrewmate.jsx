import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

function UpdateCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [attribute1, setAttribute1] = useState('');
  const [attribute2, setAttribute2] = useState('');
  const [attribute3, setAttribute3] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  // Define attribute options
  const attribute1Options = ['Strength', 'Power', 'Force'];
  const attribute2Options = ['Intelligence', 'Wisdom', 'Knowledge'];
  const attribute3Options = ['Speed', 'Agility', 'Dexterity'];

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();
      
      setIsFetching(false);
      
      if (error) {
        console.error('Error fetching crewmate:', error);
        return;
      }
      
      if (data) {
        setName(data.name);
        setAttribute1(data.attribute1);
        setAttribute2(data.attribute2);
        setAttribute3(data.attribute3);
        setDescription(data.description || '');
      }
    };

    fetchCrewmate();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await supabase
      .from('crewmates')
      .update({ name, attribute1, attribute2, attribute3, description })
      .eq('id', id);
    
    setIsLoading(false);
    
    if (error) {
      console.error('Error updating crewmate:', error);
      return;
    }
    
    navigate(`/crewmate/${id}`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this crewmate?')) return;
    
    setIsLoading(true);
    
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);
    
    setIsLoading(false);
    
    if (error) {
      console.error('Error deleting crewmate:', error);
      return;
    }
    
    navigate('/gallery');
  };

  if (isFetching) return <p>Loading...</p>;

  return (
    <div className="update-crewmate">
      <h2>Update Crewmate</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <label>Attribute 1:</label>
          <div className="attribute-options">
            {attribute1Options.map(option => (
              <button 
                key={option}
                type="button"
                className={attribute1 === option ? 'selected' : ''}
                onClick={() => setAttribute1(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Attribute 2:</label>
          <div className="attribute-options">
            {attribute2Options.map(option => (
              <button 
                key={option}
                type="button"
                className={attribute2 === option ? 'selected' : ''}
                onClick={() => setAttribute2(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Attribute 3:</label>
          <div className="attribute-options">
            {attribute3Options.map(option => (
              <button 
                key={option}
                type="button"
                className={attribute3 === option ? 'selected' : ''}
                onClick={() => setAttribute3(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={isLoading} className="btn save-btn">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button 
            type="button" 
            onClick={handleDelete} 
            disabled={isLoading} 
            className="btn delete-btn"
          >
            {isLoading ? 'Deleting...' : 'Delete Crewmate'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCrewmate;