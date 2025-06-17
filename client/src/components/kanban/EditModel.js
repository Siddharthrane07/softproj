import React, { useState, useEffect } from 'react';
import './EditModel.css';

const EditModal = ({ task, onClose, onSave }) => {
  const [form, setForm] = useState({ ...task });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form); // call parent save handler
    onClose(); // close modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} />
          <textarea name="description" value={form.description} onChange={handleChange} />
          <input name="person" value={form.person} onChange={handleChange} />
          <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button type="submit">Save Changes</button>
        </form>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default EditModal;
