import React from 'react';

export default function FormCard({
  form,
  formData,
  setFormData,
  cardStatus,
  setCardStatus,
  setSubmittedData,
  setAlertMessage,
  taskActionButtonsHandler,
}) {
  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (
      formData.title === '' ||
      formData.description === '' ||
      formData.status === '' ||
      formData.priority === '' ||
      formData.dueDate === ''
    )
      return;
    
    formData.createdDate = new Date().toLocaleString();
    setSubmittedData(formData);
    setFormData(form);
    handleClose();
  };

  // Card close handler
  const handleClose = () => {
    setFormData(form);
    setCardStatus('');
  };

  if (cardStatus === 'new' || cardStatus === 'edit') {
    return (
      <div className='card'>
        <div className="cardContainer">
          <div className='cardHeader'>
            <div className='cardHeaderAction'>
              <span onClick={handleClose} className='cardHeaderCloseButton'>X</span>
              <div className='status'></div>
            </div>
            <div className='cardHeaderTitle'>
              <label htmlFor="tilte"><h3><span>Task Details</span></h3></label>
            </div>
          </div>
          <div className='cardBody'>
            <div className='inputItem'>
              <label>Title </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                placeholder="Title"
                onChange={handleChange}
              />
            </div>
            <div className='inputItem'>
              <label>Description </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
            <div className='inputItem'>
              <label htmlFor="dueDate">Due Date </label>
              <input
                type="date"
                value={formData.dueDate}
                name="dueDate"
                onChange={handleChange}
              />
            </div>
            <div className='inputItem'>
              <label>Priority </label>
              <span>
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={formData.priority === 'Low'}
                  onChange={handleChange}
                />
                <label>Low</label>
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={formData.priority === 'Medium'}
                  onChange={handleChange}
                />
                <label>Medium</label>
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={formData.priority === 'High'}
                  onChange={handleChange}
                />
                <label>High</label>
              </span>
            </div>
            <div className='inputItem'>
              <label>Status </label>
              <select name="status" onChange={handleChange} value={formData.status}>
                <option value=""></option>
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className='cardActionButtons'>
              <button onClick={() => setFormData(form)}>Clear</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (cardStatus === 'view') {
    return (
      <div className='card'>
        <div className="cardContainer">
          <div className='cardHeader'>
            <div className='cardHeaderAction'>
              <span onClick={handleClose} className='cardHeaderCloseButton'>X</span>
              <div className='status'></div>
            </div>
            <div className='cardHeaderTitle'>
              <label htmlFor="tilte"><h3><span>Task Details</span></h3></label>
            </div>
          </div>
          <div className='cardBody'>
            <div className='displayItem'>
              <label>Title </label>
              <h4>{formData.title}</h4>
            </div>
            <div className='displayItem'>
              <label>Description </label>
              <h4>{formData.description}</h4>
            </div>
            <div className='displayItem'>
              <label htmlFor="dueDate">Due Date </label>
              <h4>{formData.dueDate}</h4>
            </div>
            <div className='displayItem'>
              <label>Priority </label>
              <h4>{formData.priority}</h4>
            </div>
            <div className='displayItem'>
              <label>Status </label>
              <h4>{formData.status}</h4>
            </div>
            <div className='cardActionButtons'>
              <button onClick={() => taskActionButtonsHandler(formData.id, 'edit')}>Edit</button>
              <button onClick={() => taskActionButtonsHandler(formData.id, 'delete')}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
