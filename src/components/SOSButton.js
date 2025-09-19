import React, { useState } from 'react';
import SOSModal from './SOSModal'; // We will create this next
import './SOSButton.css';

function SOSButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="sos-button">
        SOS
      </button>
      {isModalOpen && <SOSModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}

export default SOSButton;
