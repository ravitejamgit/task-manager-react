import React from 'react';
import { Link } from 'react-router-dom';

export default function SavedList({ loadedData, taskActionButtonsHandler }) {
  if (loadedData.length == 0) {
    return (
      <div>
        <p>No Data Saved...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="listCount">
        <span>Count : {loadedData.length}</span>
      </div>
      <ul>
        {loadedData.map((item, index) => (
          <li key={index}>
            <div className="task">
              <span>
                {item.title} - {item.priority} - {item.status} -{' '}
                {new Date(item.dueDate).toLocaleDateString()}
              </span>
              <div className="taskActionButtons">
                <button
                  onClick={() => taskActionButtonsHandler(item.id, 'view')}
                >
                  View
                </button>
                <button
                  onClick={() => taskActionButtonsHandler(item.id, 'edit')}
                >
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
