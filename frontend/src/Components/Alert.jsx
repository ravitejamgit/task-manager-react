import React, { useState, useEffect } from 'react';

export function Alert({message, type, setAlertMessage}) {
  const colorCodes = {
    success : '#4caf50',
    error : 'red',
    warning : '#edb751ff'
  }
  const [visible, setVisible] = useState(true);
  let duration = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage({message : '', type: ''});
      setVisible(false);
    }, duration);

    // Cleanup the timer if the component unmounts or the duration changes before the timeout
    return () => clearTimeout(timer);
  }, [duration]); // Re-run effect if duration changes

  

  return visible ? (
    <div
      style={{
        position: 'fixed',
        top: '2px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: colorCodes[type] || 'grey', // green background
        color: 'white',
        padding: '4px',
        borderRadius: '4px',
        zIndex: 9999,
        fontSize: '14px',
        fontWeight: 'normal',
        textAlign: 'center',
        transition: 'top 1s ease-out',
        minWidth: '250px'
      }}
      className='alert-comp'
    >
      {message}
    </div>
  ) : null;
}
