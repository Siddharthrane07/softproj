import React, { useState } from 'react';
import axios from 'axios';
import './ProjectForm.css'

const ProjectForm = ({onClose,onSubmit} ) =>{
    const [form,setForm] = useState({
        title: '',
        description: '',
        tasks: '',
        members: '',
        deadline: '',
        progress: 0
    })

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8800/api/dashboard/dashboardproject",form) //api
        onSubmit?.(form);
        onClose();
    }

    return (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit} className="form-container">
              <input type="text" name="title" placeholder="Project Title" value={form.title} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
              <input type="number" name="tasks" placeholder="No. of Tasks" value={form.tasks} onChange={handleChange} />
              <input type="number" name="members" placeholder="No. of Members" value={form.members} onChange={handleChange} />
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
              <input type="range" name="progress" value={form.progress} onChange={handleChange} />
              <button type="submit">Save Project</button>
            </form>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
        </div>
      );
    };

    export default ProjectForm;
