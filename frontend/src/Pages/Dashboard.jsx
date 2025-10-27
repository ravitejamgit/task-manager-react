import React, { useEffect } from 'react';
import { useState } from 'react';
import FormCard from '../Components/FormCard';
import SavedList from '../Components/SavedList';
import {
  getData,
  addTask,
  deleteTask,
  updateTask,
  setUserLoggedOut,
} from '../Utils/LocalStorageHelpers';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

// Nested Components
const UpArrowSVG = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="12 19 12 5"></polyline>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

const DownArrowSVG = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="12 5 12 19"></polyline>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
);

export default function Dashboard({setAlertMessage}) {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedIn'));

  const form = {
    userId: loggedInUser.id,
    title: '',
    description: '',
    status: '',
    priority: '',
    dueDate: '',
    createdDate: '',
  };

  const emptyFilter = {
    priorityFilter: '',
    statusFilter: '',
    dueDateFilter: '',
  };

  const selectedSort = {
    title: false,
    priority: false,
    status: false,
    dueDate: false,
  };

  const priorityValues = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const [formData, setFormData] = useState(form);
  const [submittedData, setSubmittedData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const [searchReq, setSearchReq] = useState('');

  // Card states
  const [cardStatus, setCardStatus] = useState('');

  // Edit action state
  const [editStatus, setEditStatus] = useState(false);

  // Filter Selection States
  const [filters, setFilters] = useState(() => emptyFilter);

  // Sort Selection States
  const [sortSelection, setSortSelection] = useState(() => selectedSort);
  const [toggledSorts, setToggledSorts] = useState(false);
  const [toggledTitleSort, setToggledTitleSort] = useState(false);
  const [toggledPrioritySort, setToggledPrioritySort] = useState(false);
  const [toggledDueDateSort, setToggledDueDateSort] = useState(false);
  // console.log('sort Selection before useEffect : ' , sortSelection);


  const loadData = async () => {
    let retrievedData = await getData(loggedInUser.id);
    //console.log(retrievedData);
    // console.log(user);

    // Searched data
    if (searchReq != '') {
      retrievedData = retrievedData.filter((each) =>
        each.title.includes(searchReq)
      );
    } else {
      retrievedData = await getData(loggedInUser.id);
    }

    // Applying filters on fetchedData
    retrievedData = retrievedData.filter((each) => {
      return (
        (filters.priorityFilter === '' ||
          filters.priorityFilter === each.priority) &&
        (filters.statusFilter === '' || filters.statusFilter === each.status) &&
        (filters.dueDateFilter === '' || filters.dueDateFilter <= each.dueDate)
      );
    });

    // Sorting
    if (toggledSorts) {
      // with respect to title
      if (toggledTitleSort) {
        retrievedData.sort((task1, task2) => {
          return sortSelection.title
            ? task1.title.localeCompare(task2.title)
            : task2.title.localeCompare(task1.title);
        });
        setToggledTitleSort(false);
      } else if (toggledPrioritySort) {
        retrievedData.sort((task1, task2) => {
          return sortSelection.priority
            ? priorityValues[task1.priority] - priorityValues[task2.priority]
            : priorityValues[task2.priority] - priorityValues[task1.priority];
        });
        setToggledPrioritySort(false);
      } else if (toggledDueDateSort) {
        retrievedData.sort((task1, task2) => {
          return sortSelection.dueDate
            ? new Date(task1.dueDate) - new Date(task2.dueDate)
            : new Date(task2.dueDate) - new Date(task1.dueDate);
        });
        setToggledDueDateSort(false);
      }
      setToggledSorts(false);
    }

    setFetchedData(retrievedData);
  }
  

  useEffect(() => {
    // If no loggedin
    if (!loggedInUser) {
      navigate('/login');
    }

    if (submittedData) {
      if (editStatus) {
        updateTask(submittedData);
        setAlertMessage({message: 'Updated Successfully...', type: 'success'});
        setEditStatus(false);
      } else {
        addTask(submittedData).then(() => {
          setAlertMessage({message: 'Task Added Successfully', type: 'success'});
        })
      }
      setSubmittedData(null);
    }

    loadData();

  }, [submittedData, filters, sortSelection, searchReq]);

  // Action buttons of task -> VIEW, EDIT, DELETE
  const taskActionButtonsHandler = (taskId, action) => {
    if (action === 'delete') {
      deleteTask(taskId).then((ok) => {
        if(ok) {
          setAlertMessage({message: 'Deleted Task..', type: 'success'});
          setCardStatus('');
          setFormData(form);
          loadData();
        }
        else {
          setAlertMessage({message: 'Failed to delete task..', type: 'error'});
        }
      })
      
    } else {
      setCardStatus(action); // view or edit
      if (action === 'edit') {
        setEditStatus(true);
      }
      setFormData(fetchedData.find((each) => each.id === taskId));
    }
  };

  // Filter handles
  const filtersHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetFilterHandler = () => {
    setFilters(emptyFilter);
    setSortSelection(selectedSort);
    setToggledSorts(false);
    setSearchReq('');
  };

  const sortSelectionHandler = (event) => {
    const ele = event.currentTarget.name;
    const val = !sortSelection[ele];
    setSortSelection((prev) => ({
      ...prev,
      [ele]: val,
    }));

    if (ele === 'title') {
      setToggledTitleSort(true);
    } else if (ele === 'priority') setToggledPrioritySort(true);
    else if (ele === 'dueDate') setToggledDueDateSort(true);
    setToggledSorts(true);
  };

  // Search Handler
  const searchHandler = (event) => {
    setSearchReq(event.currentTarget.value);
  };

  if(fetchedData) {
    return (
      <div className="dashboard">
        
        {/* ======= Header ======= */}
        <div className="dashboardHeaderSection">
          <div>
            <h1>Dashboard</h1>
            
          </div>
          <div className="headerButtons">
            <center style={{margin: "5px"}}>
              User: <i>{loggedInUser.name || 'Guest'}</i>
            </center>
            {/* <button>Profile</button> */}
            <button
              className="logoutBtn"
              onClick={() => {
                setUserLoggedOut();
                setAlertMessage({message : 'Logged out successfully...', type : 'warning'})
                navigate('/login');
              }}
            >
              Log out
            </button>
          </div>
        </div>

        {/* ======= Main Body ======= */}
        <div className="mainBody">
          {/* ===== Filters Section ===== */}
          <div className="filtersSection">
            <div className="filterHeader">
              <h3>Filters</h3>
              <button onClick={resetFilterHandler} className="resetBtn">
                Reset
              </button>
            </div>

            <div className="filterForm">
              <div className="filterItem">
                <label htmlFor="priorityFilter">Priority</label>
                <select
                  name="priorityFilter"
                  id="priorityFilter"
                  onChange={filtersHandler}
                  value={filters.priorityFilter}
                >
                  <option value="">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="filterItem">
                <label htmlFor="statusFilter">Status</label>
                <select
                  name="statusFilter"
                  id="statusFilter"
                  onChange={filtersHandler}
                  value={filters.statusFilter}
                >
                  <option value="">All</option>
                  <option value="To-Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="filterItem">
                <label htmlFor="dueDateFilter">Due Date</label>
                <input
                  type="date"
                  name="dueDateFilter"
                  value={filters.dueDateFilter}
                  onChange={filtersHandler}
                />
              </div>
            </div>
            

            {/* Form card (add / edit task) */}
            <FormCard
              form={form}
              formData={formData}
              setFormData={setFormData}
              cardStatus={cardStatus}
              setCardStatus={setCardStatus}
              setSubmittedData={setSubmittedData}
              setAlertMessage = {setAlertMessage}
              taskActionButtonsHandler={taskActionButtonsHandler}
            />
          </div>

          {/* ===== List Section ===== */}
          <div className="listContainer">
            <div className="addButtonSection">
              <button className="newTaskBtn" onClick={() => setCardStatus('new')}>
                + New Task
              </button>
              <div className="listSearchSection">
                <input
                  type="text"
                  placeholder="Search by title..."
                  name="searchTask"
                  onChange={searchHandler}
                  value={searchReq}
                />
                <button onClick={() => setSearchReq('')}>✖</button>
              </div>
            </div>
            
            <div className="listTopBar">
              <table>
                <thead>
                  <tr>
                    <th>
                      <button name="title" onClick={sortSelectionHandler}>
                        Title {sortSelection.title ? <UpArrowSVG /> : <DownArrowSVG />}
                      </button>
                    </th>
                    <th>
                      <button name="priority" onClick={sortSelectionHandler}>
                        Priority {sortSelection.priority ? <UpArrowSVG /> : <DownArrowSVG />}
                      </button>
                    </th>
                    <th>
                      <button name="dueDate" onClick={sortSelectionHandler}>
                        Due Date {sortSelection.dueDate ? <UpArrowSVG /> : <DownArrowSVG />}
                      </button>
                    </th>
                    <th>
                      <button name="status" >
                        Status
                      </button>
                    </th>
                    <th>
                      <button>Actions</button>
                    </th>
                  </tr>
                </thead>
                {
                  fetchedData ? 
                    <SavedList
                      loadedData={fetchedData}
                      taskActionButtonsHandler={taskActionButtonsHandler}
                      setCardStatus={setCardStatus}
                    /> : null
                }
              </table>
            </div>

            
          </div>
        </div>
      </div>
    );
  }
}
