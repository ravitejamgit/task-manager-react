import React from 'react';

// Data Management
export async function getData(user) {
  try {
    const data = await getAllData();
    const filtered = data.filter((each) => each.userId === user);
    return filtered ? filtered : [];
  }
  catch(error) {
    console.log(error);
  }
}

export async function getAllData() {
  try {
    const response = await fetch('http://localhost:5000/Data', { method: 'GET' });
    const parsedData = await response.json();
    return parsedData ? parsedData : [];
  }
  catch(error) {
    console.log(error);
  }
}

export function saveData(data) {
  localStorage.setItem('Data', JSON.stringify(data));
}

export async function addTask(task) {
  try{
    const response = await fetch('http://localhost:5000/Data', {method: 'POST', body: JSON.stringify(task)});
    if(response.ok) {
      console.log('Task added successfully...');
    }
    else {
      console.log('Failed to add task.');
    }
  }catch(error) {
    console.log(error);
  } 
}

export async function deleteTask(taskId) {
  try {
    const response = await fetch(`http://localhost:5000/Data/${taskId}`, { method: 'DELETE' });
    console.log('Status ' + response.status + " : " + response.statusText);
    return response.ok;
  }
  catch(error) {
    console.log(error);
  }
}

export async function updateTask(task) {
  try {
    const response = await fetch(`http://localhost:5000/Data/${task.id}`, { method: 'PUT', body: JSON.stringify(task) });
    console.log('Status ' + response.status + " : " + response.statusText);
    return response.ok;
  }
  catch(error) {
    console.log(error);
    
  }
}


// User Authentication
/** User Attributes
 * --> User Name - name
 * --> Username - userName
 * --> User Email - userEmail
 * --> User ID - userId
 * --> User Password - userPassword
 * 
 */
export function fetchUsers() {
  let fetched = JSON.parse(localStorage.getItem('users'));
  return fetched ? fetched : [];
}

export function saveUsers(data) {
  localStorage.setItem('users', JSON.stringify(data));
}

export async function loginUser(data) {
  try {
    const response = await fetch('http://localhost:5000/Users', { method: 'GET' });
    const parsed = await response.json();
    let user = await parsed.find((each) => each.userName === data.userName && each.password === data.password);
    return user ? {userName: user.userName, id: user.id, email: user.email, name: user.name} : null;
  }
  catch(error) {
    console.log(error);
  }
}

export async function signUpUser(data) {
  try {
    const response = await fetch('http://localhost:5000/Users', { method: 'POST', body: JSON.stringify(data) });
    if(response.ok) {
      console.log('User registered successfully..');
    }
    else {
      console.log('Registration failed..');
    }
  }
  catch(error) {
    console.log(error);
  }
}

export function isUserNameExist(user) {
  let fetched = fetchUsers();
  return fetched.userName === user;
}


// Logged In User.
export function fetchLoggedIn() {
  let data = JSON.parse(localStorage.getItem('loggedIn'));
  return data ? data : [];
}
export function setUserLoggedIn(user) {
  localStorage.setItem('loggedIn', JSON.stringify(user));
}

export function isUserLoggedIn(user) {
  let fetched = fetchLoggedIn();
  return fetched.find((each) => each === user);
}

export function setUserLoggedOut(user) {
  localStorage.removeItem('loggedIn');
}