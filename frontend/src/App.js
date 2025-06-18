import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState({
    content: '',
    type: 'text',
    color: '#ffffff',
    fontSize: 16,
    position: { x: 100, y: 100 },
    size: { width: 200, height: 50 }
  });
  const [videoUrl, setVideoUrl] = useState('');

  // Load overlays from API
  useEffect(() => {
    fetchOverlays();
    fetchVideoUrl();
  }, []);

  const fetchOverlays = async () => {
    try {
      const response = await fetch('/api/overlays');
      const data = await response.json();
      setOverlays(data);
    } catch (error) {
      console.error('Error fetching overlays:', error);
    }
  };

  const fetchVideoUrl = async () => {
    try {
      const response = await fetch('/api/stream-url');
      const data = await response.json();
      setVideoUrl(data.url);
    } catch (error) {
      console.error('Error fetching video URL:', error);
    }
  };

  const createOverlay = async () => {
    if (!newOverlay.content) {
      alert('Please enter content');
      return;
    }

    const overlay = {
      ...newOverlay,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 50 }
    };

    try {
      const response = await fetch('/api/overlays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(overlay)
      });
      
      if (response.ok) {
        setNewOverlay({ content: '', type: 'text', color: '#ffffff', fontSize: 16 });
        fetchOverlays();
      }
    } catch (error) {
      console.error('Error creating overlay:', error);
    }
  };

  const deleteOverlay = async (id) => {
    try {
      const response = await fetch(`/api/overlays/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchOverlays();
      }
    } catch (error) {
      console.error('Error deleting overlay:', error);
    }
  };

  const updatePositionFromPreset = (preset) => {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;
    
    const videoWidth = videoContainer.offsetWidth;
    const videoHeight = videoContainer.offsetHeight;
    
    let x, y;
    
    switch(preset) {
      case 'top-left':
        x = 10; y = 10;
        break;
      case 'top-right':
        x = videoWidth - 210; y = 10;
        break;
      case 'bottom-left':
        x = 10; y = videoHeight - 60;
        break;
      case 'bottom-right':
        x = videoWidth - 210; y = videoHeight - 60;
        break;
      case 'center':
        x = (videoWidth - 200) / 2; y = (videoHeight - 50) / 2;
        break;
      case 'top-center':
        x = (videoWidth - 200) / 2; y = 10;
        break;
      case 'bottom-center':
        x = (videoWidth - 200) / 2; y = videoHeight - 60;
        break;
      default:
        return;
    }
    
    setNewOverlay(prev => ({
      ...prev,
      position: { x: Math.max(0, x), y: Math.max(0, y) }
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Livesitter - Live Stream Viewer</h1>
      </header>
      
      <main>
        <div className="video-section">
          <div className="video-container">
            <video controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Overlay Rendering on Video */}
            <div className="video-overlays">
              {overlays.map(overlay => (
                <div
                  key={overlay.id}
                  className={`overlay ${overlay.type}`}
                  style={{
                    position: 'absolute',
                    left: `${overlay.position.x}px`,
                    top: `${overlay.position.y}px`,
                    width: `${overlay.size.width}px`,
                    height: `${overlay.size.height}px`,
                    color: overlay.color || '#ffffff',
                    fontSize: `${overlay.fontSize}px`,
                    zIndex: 1000,
                    pointerEvents: 'none',
                    background: 'rgba(0, 0, 0, 0.7)',
                    padding: '5px',
                    borderRadius: '3px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  {overlay.type === 'text' ? (
                    <span>{overlay.content}</span>
                  ) : (
                    <img 
                      src={overlay.content} 
                      alt="Logo" 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overlay-section">
          <h2>Overlay Management</h2>
          
          <div className="overlay-form">
            <input
              type="text"
              placeholder="Text content or logo URL"
              value={newOverlay.content}
              onChange={(e) => setNewOverlay({...newOverlay, content: e.target.value})}
            />
            <select
              value={newOverlay.type}
              onChange={(e) => setNewOverlay({...newOverlay, type: e.target.value})}
            >
              <option value="text">Text</option>
              <option value="logo">Logo</option>
            </select>
            <input
              type="color"
              value={newOverlay.color}
              onChange={(e) => {
                console.log('Color changed to:', e.target.value); // Debug log
                setNewOverlay({...newOverlay, color: e.target.value});
              }}
            />
            <input
              type="number"
              placeholder="Font size"
              value={newOverlay.fontSize}
              onChange={(e) => setNewOverlay({...newOverlay, fontSize: parseInt(e.target.value)})}
            />
            
            {/* Position Preset */}
            <select
              onChange={(e) => updatePositionFromPreset(e.target.value)}
            >
              <option value="">Position Preset</option>
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="center">Center</option>
              <option value="top-center">Top Center</option>
              <option value="bottom-center">Bottom Center</option>
            </select>
            
            {/* Custom Position */}
            <div className="position-inputs">
              <input
                type="number"
                placeholder="X position"
                value={newOverlay.position.x}
                onChange={(e) => setNewOverlay({
                  ...newOverlay, 
                  position: {...newOverlay.position, x: parseInt(e.target.value) || 0}
                })}
              />
              <input
                type="number"
                placeholder="Y position"
                value={newOverlay.position.y}
                onChange={(e) => setNewOverlay({
                  ...newOverlay, 
                  position: {...newOverlay.position, y: parseInt(e.target.value) || 0}
                })}
              />
            </div>
            
            {/* Custom Size */}
            <div className="size-inputs">
              <input
                type="number"
                placeholder="Width"
                value={newOverlay.size.width}
                onChange={(e) => setNewOverlay({
                  ...newOverlay, 
                  size: {...newOverlay.size, width: parseInt(e.target.value) || 200}
                })}
              />
              <input
                type="number"
                placeholder="Height"
                value={newOverlay.size.height}
                onChange={(e) => setNewOverlay({
                  ...newOverlay, 
                  size: {...newOverlay.size, height: parseInt(e.target.value) || 50}
                })}
              />
            </div>
            
            <button onClick={createOverlay}>Add Overlay</button>
          </div>

          <div className="overlays-list">
            {overlays.map(overlay => (
              <div key={overlay.id} className="overlay-item">
                <h4>{overlay.type.toUpperCase()}</h4>
                <p><strong>Content:</strong> {overlay.content}</p>
                <p><strong>Position:</strong> ({overlay.position.x}, {overlay.position.y})</p>
                <p><strong>Size:</strong> {overlay.size.width}x{overlay.size.height}</p>
                <button 
                  className="delete-btn"
                  onClick={() => deleteOverlay(overlay.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 