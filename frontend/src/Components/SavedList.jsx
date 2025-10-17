import React from 'react';
import { Link } from 'react-router-dom';

export default function SavedList({ loadedData, taskActionButtonsHandler }) {
  if (loadedData.length == 0) {
    return (
      <table>
        <tr>
          <td style={{columnSpan:2}}><p>No Data Saved...</p></td>
        </tr>
      </table>
    );
  }
  return (
    <tbody>
      {loadedData.map((item, index) => (
        <tr key={index}>
          <td>{item.title}</td>
          <td>{item.priority}</td>
          <td>{new Date(item.dueDate).toLocaleDateString()}</td>
          <td>{item.status}</td>
          <td>
            <div className="taskActionButtons">
              <button onClick={() => taskActionButtonsHandler(item.id, 'view')}>
                View
              </button>
              <button onClick={() => taskActionButtonsHandler(item.id, 'edit')}>
                Edit
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
