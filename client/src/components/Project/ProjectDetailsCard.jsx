import React, { useState } from 'react';
import axios from 'axios';
import './ProjectForm.css'
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';

const ProjectForm = ({onClose,onSubmit} ) =>{
    const { projectId } = useParams(); 
    const [form,setForm] = useState({
        title: '',
        description: '',
        person: '',
        deadline: '',
        priority: ''
        
    })

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }


    const handleSubmit = async (e) =>{

        e.preventDefault();
            const taskData = {
              ...form,
            projectId  // 
          };
          await axios.post("http://localhost:8800/api/project/projectdetails", taskData, {
          withCredentials: true,
          });
        
        onSubmit?.(form);
        onClose();
        }
        
    return (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Tasks</h2>
            <form onSubmit={handleSubmit} className="form-container">
              <input type="text" name="title" placeholder="Project Title" value={form.title} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
              <input type="text" name="person" placeholder="person" value={form.person} onChange={handleChange} />
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
                <input type="text" name="priority" placeholder="priority" value={form.priority} onChange={handleChange} />
              <button type="submit">Save Project</button>
            </form>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
        </div>
      );
    };
  

    export default ProjectForm;
