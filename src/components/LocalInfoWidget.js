import React, { useState } from 'react';
import api from '../api';
import Spinner from './Spinner';
import './LocalInfoWidget.css';

// A function to safely parse the AI's markdown response into HTML
const parseMarkdown = (text) => {
    if (!text) return '';
    // Bold text: **text** -> <strong>text</strong>
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // New lines -> <br> tags
    html = html.replace(/\n/g, '<br />');
    return html;
};

function LocalInfoWidget({ locationName }) {
  const [localInfo, setLocalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerateTips = async () => {
    setIsLoading(true);
    setHasGenerated(true);
    try {
      const response = await api.post('/explore/local-tips', { location: locationName });
      setLocalInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch local tips:", error);
      setLocalInfo("Sorry, we couldn't generate local tips at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="local-info-widget">
      {!hasGenerated ? (
        <div className="generate-tips-prompt">
            <h3>Want to Explore Like a Local?</h3>
            <p>Click the button to get AI-powered tips on local cuisine, dress codes, and events for {locationName}.</p>
            <button onClick={handleGenerateTips} disabled={isLoading} className="generate-btn">
                {isLoading ? 'Generating...' : `Get Local Tips for ${locationName}`}
            </button>
        </div>
      ) : (
        <div className="tips-content">
            {isLoading ? (
                <Spinner />
            ) : (
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(localInfo) }} />
            )}
        </div>
      )}
    </div>
  );
}

export default LocalInfoWidget;
