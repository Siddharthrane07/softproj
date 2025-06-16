import { ArrowLeft, Plus, Settings } from 'lucide-react';
import Navbar from '../../components/navbar/Navbar.jsx'; // adjust if your navbar path differs
import './projectDetails.css';
import React, { useEffect, useState,useContext } from 'react';
import ProjectForm from '../../components/Project/ProjectDetailsCard.jsx';// adjust if your form path differs
import KanbanBoard from '../../components/kanban/kanban.jsx';

const ProjectDetails = () => {
          const [showForm,setShowForm] = useState(false);
          const [projects, setProjects] = useState([]);

      const handleAddProject = async (newProject) => {
        setProjects(prev =>[...prev, newProject]);
      };

  return (
    <div className="project-details">
      <Navbar />
      
      <div className="project-details-container">
        <div className="project-details-header">
          <button className="back-button" >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="project-header-content">
            <div className="project-info">
              <div className="project-title-row">
                <h1 className="project-title">Project Title</h1>
                <span className="project-status">In Progress</span>
              </div>
              <p className="project-description">
                A short description of the project will be displayed here.
              </p>
            </div>
            
            <div className="project-actions">
              <button onClick={() => setShowForm(true)} className="add-task-btn">
                <Plus size={16} />
                Add Task
              </button>

                {showForm && (
                <ProjectForm
                  onClose={() => setShowForm(false)}
                  onSubmit={handleAddProject}
                />
              )}

              <button className="settings-btn">
                <Settings size={16} />
              </button>
            </div>
          </div>

          <div className="project-progress">
            <div className="progress-header">
              <span className="progress-label">Project Progress</span>
              <span className="progress-value">75%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `75%` }} />
            </div>
          </div>
        </div>
         <KanbanBoard />
      </div>
    </div>
  );
};

export default ProjectDetails;