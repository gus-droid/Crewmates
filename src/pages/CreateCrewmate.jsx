import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

function CreateCrewmate() {
  const [name, setName] = useState('');
  const [attribute1, setAttribute1] = useState('');
  const [attribute2, setAttribute2] = useState('');
  const [attribute3, setAttribute3] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Define attribute options
  const attribute1Options = ['Strength', 'Power', 'Force'];
  const attribute2Options = ['Intelligence', 'Wisdom', 'Knowledge'];
  const attribute3Options = ['Speed', 'Agility', 'Dexterity'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, attribute1, attribute2, attribute3, description }])
      .select();
    
    setIsLoading(false);
    
    if (error) {
      console.error('Error creating crewmate:', error);
      return;
    }
    
    navigate('/gallery');
  };

  return (
    <div className="create-crewmate">
      <h2>Create a New Crewmate</h2>
      <form onSubmit={handleSubmit}>
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
        
        <button type="submit" disabled={isLoading} className="btn">
          {isLoading ? 'Creating...' : 'Create Crewmate'}
        </button>
      </form>
    </div>
  );
}

export default CreateCrewmate;