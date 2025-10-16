import React, { useState, useEffect } from 'react';

export function Alert({ message, duration }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    // Cleanup the timer if the component unmounts or the duration changes before the timeout
    return () => clearTimeout(timer);
  }, [duration]); // Re-run effect if duration changes

  return visible ? (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        margin: '10px 0',
      }}
    >
      {message}
    </div>
  ) : null;
}
