import { useState, useEffect } from 'react';

function CrewStatistics({ crewmates }) {
  const [stats, setStats] = useState({
    attribute1: {},
    attribute2: {},
    attribute3: {},
    totalCrewmates: 0
  });

  useEffect(() => {
    if (!crewmates || crewmates.length === 0) return;

    const totalCrewmates = crewmates.length;
    
    // Count occurrences of each attribute value
    const attribute1Count = {};
    const attribute2Count = {};
    const attribute3Count = {};
    
    crewmates.forEach(crewmate => {
      // Attribute 1
      if (crewmate.attribute1) {
        attribute1Count[crewmate.attribute1] = (attribute1Count[crewmate.attribute1] || 0) + 1;
      }
      
      // Attribute 2
      if (crewmate.attribute2) {
        attribute2Count[crewmate.attribute2] = (attribute2Count[crewmate.attribute2] || 0) + 1;
      }
      
      // Attribute 3
      if (crewmate.attribute3) {
        attribute3Count[crewmate.attribute3] = (attribute3Count[crewmate.attribute3] || 0) + 1;
      }
    });
    
    setStats({
      attribute1: attribute1Count,
      attribute2: attribute2Count,
      attribute3: attribute3Count,
      totalCrewmates
    });
  }, [crewmates]);

  // Calculate percentage
  const calculatePercentage = (count, total) => {
    return Math.round((count / total) * 100);
  };

  if (!crewmates || crewmates.length === 0) {
    return null;
  }

  return (
    <div className="crew-statistics">
      <h3>Crew Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Attribute 1 Distribution</h4>
          <div className="stat-bars">
            {Object.entries(stats.attribute1).map(([attr, count]) => (
              <div key={attr} className="stat-item">
                <div className="stat-label">{attr}</div>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar" 
                    style={{ width: `${calculatePercentage(count, stats.totalCrewmates)}%` }}
                  ></div>
                </div>
                <div className="stat-percentage">{calculatePercentage(count, stats.totalCrewmates)}%</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="stat-card">
          <h4>Attribute 2 Distribution</h4>
          <div className="stat-bars">
            {Object.entries(stats.attribute2).map(([attr, count]) => (
              <div key={attr} className="stat-item">
                <div className="stat-label">{attr}</div>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar" 
                    style={{ width: `${calculatePercentage(count, stats.totalCrewmates)}%` }}
                  ></div>
                </div>
                <div className="stat-percentage">{calculatePercentage(count, stats.totalCrewmates)}%</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="stat-card">
          <h4>Attribute 3 Distribution</h4>
          <div className="stat-bars">
            {Object.entries(stats.attribute3).map(([attr, count]) => (
              <div key={attr} className="stat-item">
                <div className="stat-label">{attr}</div>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar" 
                    style={{ width: `${calculatePercentage(count, stats.totalCrewmates)}%` }}
                  ></div>
                </div>
                <div className="stat-percentage">{calculatePercentage(count, stats.totalCrewmates)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="crew-count">
        <strong>Total Crewmates:</strong> {stats.totalCrewmates}
      </div>
    </div>
  );
}

export default CrewStatistics;