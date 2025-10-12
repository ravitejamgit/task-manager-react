import React from 'react';

export default function FormCard({
  form,
  formData,
  setFormData,
  cardStatus,
  setCardStatus,
  setSubmittedData,
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
    if (formData.id === '') {
      formData.id = Date.now();
      formData.createdDate = new Date().toLocaleString();
    }
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
      <div className="InputForm">
        <span onClick={handleClose}>X</span>
        <div>
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
        <div>
          <label>Description </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date </label>
          <input
            type="date"
            value={formData.dueDate}
            name="dueDate"
            onChange={handleChange}
          />
        </div>
        <div>
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
        <div>
          <label>Status </label>
          <select name="status" onChange={handleChange} value={formData.status}>
            <option value=""></option>
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div></div>
        <div></div>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setFormData(form)}>Clear</button>
      </div>
    );
  } else if (cardStatus === 'view') {
    return (
      <div className="InputForm">
        <span onClick={() => setCardStatus('')}>X</span>
        <div>
          <label>Title </label>
          <h4>{formData.title}</h4>
        </div>
        <div>
          <label>Description </label>
          <h4>{formData.description}</h4>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date </label>
          <h4>{formData.dueDate}</h4>
        </div>
        <div>
          <label>Priority </label>
          <h4>{formData.priority}</h4>
        </div>
        <div>
          <label>Status </label>
          <h4>{formData.status}</h4>
        </div>
        <button onClick={() => taskActionButtonsHandler(formData.id, 'edit')}>
          Edit
        </button>
        <button onClick={() => taskActionButtonsHandler(formData.id, 'delete')}>
          Delete
        </button>
      </div>
    );
  }
}
