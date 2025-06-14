import React from 'react';
import { Calendar, Users, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({
  id,
  title,
  description,
  taskCount,
  teamSize,
  dueDate,
  progress
}) => {
  const navigate = useNavigate();

  return (
    <div className="project-card">
      <h3 className="project-card-title">{title}</h3>
      <p className="project-card-description">{description}</p>
      
      <div className="project-card-stats">
        <div className="project-card-stat">
          <BarChart3 size={16} />
          <span>{taskCount} tasks</span>
        </div>
        <div className="project-card-stat">
          <Users size={16} />
          <span>{teamSize} members</span>
        </div>
      </div>
      
      <div className="project-card-due">
        <Calendar size={16} />
        <span>Due {dueDate}</span>
      </div>
      
      <div className="project-card-progress">
        <div className="progress-header">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <button 
        className="project-card-button"
        onClick={() => navigate(`/project/${id}`)}
      >
        Go to Project
      </button>
    </div>
  );
};

export default ProjectCard;