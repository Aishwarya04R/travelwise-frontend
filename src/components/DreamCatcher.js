import React, { useState } from 'react';
import api from '../api';
import Spinner from './Spinner';
import './DreamCatcher.css';

function DreamCatcher() {
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt || !imageFile) {
      setError('Please provide both a description and an image.');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const imageBase64 = reader.result.split(',')[1];
      try {
        const response = await api.post('/dream/generate', { prompt, image: imageBase64 });
        
        // THIS IS THE FIX: response.data is already a JavaScript object.
        // We can use it directly without parsing it again.
        setResult(response.data);

      } catch (err) {
        setError('Failed to generate your dream trip. The AI may be busy. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        setError('Failed to read the image file.');
        setIsLoading(false);
    };
  };

  return (
    <div className="dream-catcher-container">
      <div className="dream-header">
        <h1>AI Dream Catcher</h1>
        <p>Upload an inspiration photo and describe your perfect trip. Our AI will turn your dream into a real plan!</p>
      </div>
      
      <form onSubmit={handleGenerate} className="dream-form">
        <div className="form-left">
          <textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            placeholder="Describe your dream vacation... e.g., 'A quiet, romantic getaway on a beach with clear blue water and white sand.'" 
            required 
          />
          <input 
            type="file" 
            accept="image/jpeg, image/png"
            onChange={handleImageChange} 
            required 
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Dreaming...' : 'Generate My Dream Trip'}
          </button>
        </div>
        <div className="form-right">
          {imagePreview ? (
            <img src={imagePreview} alt="Inspiration Preview" className="image-preview"/>
          ) : (
            <div className="image-placeholder">Your inspiration image will appear here.</div>
          )}
        </div>
      </form>

      {isLoading && <Spinner />}
      {error && <p className="error-message">{error}</p>}
      
      {result && (
        <div className="dream-result">
          <h2>Your Dream Trip: {result.suggestedLocation}</h2>
          <div className="result-card">
            <p className="vibe"><strong>Vibe:</strong> {result.vibe}</p>
            <p><strong>Why it matches your dream:</strong> {result.whyItMatches}</p>
            <h3>Suggested Activities:</h3>
            <ul>
              {result.suggestedActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DreamCatcher;

