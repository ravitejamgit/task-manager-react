import React from 'react';

// Data Management
export function getData(user) {
  let data = JSON.parse(localStorage.getItem('Data'));
  return data ? user ? data.filter((each) => each.userId === user) : data : [];
}

export function getDate() {
  let data = JSON.parse(localStorage.getItem('Data'));
  return data ? data : [];
}

export function saveData(data) {
  localStorage.setItem('Data', JSON.stringify(data));
}

export function addTask(task) {
  const fetched = getData();
  saveData([...fetched, task]);
  console.log("Task Added Successfully.");
}

export function deleteTask(taskId) {
  const fetched = getData();
  saveData(fetched.filter((each) => each.id != taskId));
  console.log('Task Deleted Successfully');
}

export function updateTask(task) {
  const data = getData();
  saveData(data.map((each) => (each.id === task.id ? task : each)));
  console.log("Task Updated successfully");
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

export function loginUser(data) {
  let fetched = fetchUsers();
  let user = fetched.find((each) => each.userName === data.userName);
  if(user && user.password === data.password) {
    return user;
  }
  return null;
}

export function signUpUser(data) {
  let fetched = fetchUsers();
  saveUsers([...fetched, data]);
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