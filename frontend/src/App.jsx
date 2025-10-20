import './App.css';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { Alert } from './Components/Alert';
import ProtectedRoute from './Components/ProtectedRoute';
import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {
  const [alertMessage, setAlertMessage] = useState({
      message: '',
      type: ''
    });

  return (
    <div className="main">
      {
        alertMessage.message !== '' && 
        <Alert 
              message = {alertMessage.message}
              type = {alertMessage.type}
              setAlertMessage = {setAlertMessage}>
        </Alert>
      }
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setAlertMessage = {setAlertMessage}/>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard setAlertMessage = {setAlertMessage}/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
