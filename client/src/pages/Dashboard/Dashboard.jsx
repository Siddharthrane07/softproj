import React, { useEffect, useState,useContext } from 'react';
import { Plus, Search } from 'lucide-react';
import ProjectCard from './../../components/Project/ProjectCard.jsx';
import Navbar from '../../components/navbar/Navbar.jsx';
import ProjectForm from '../../components/Project/ProjectForm.jsx';
import axios from 'axios';
import  {AuthContext}  from '../../context/AuthContext';
import './Dashboard.css';


const  Dashboard = () => {
      const [searchTerm, setSearchTerm] = useState('');
      const [showForm,setShowForm] = useState(false);
      const [projects,setProjects] = useState([]);


       const { currentUser } = useContext(AuthContext);

        const fetchProjects = async () => {
          try {
              const response = await axios.get("http://localhost:8800/api/dashboard/getdashboardproject", {
              withCredentials: true,
            }); 
            const data = await response.data;
            const normalizedData = data.map(p=>({
              id:p.id,
              title: p.name,
              description: p.pdesc,
              taskCount: p.tasks,
                teamSize: p.members,
                dueDate: new Date(p.deadline).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
                  }),
               progress: p.progress
              }));

            setProjects(normalizedData);
          } catch (error) {
            console.error('Error fetching projects:', error);
          }
        };

  useEffect(() => {
    fetchProjects();
  }, []);
        

      const handleAddProject = async (newProject) => {
        setProjects(prev =>[...prev, newProject]);
      };
    
  //      const projects = [
  //   {
  //     id: '1',
  //     title: 'E-commerce Website Redesign',
  //     description: 'Complete redesign of the company e-commerce platform with modern UI/UX and improved performance.',
  //     taskCount: 12,
  //     teamSize: 5,
  //     dueDate: 'Dec 15, 2024',
  //     progress: 75
  //   },
  //   {
  //     id: '2',
  //     title: 'Mobile App Development',
  //     description: 'Native mobile application for iOS and Android with real-time notifications and offline support.',
  //     taskCount: 18,
  //     teamSize: 8,
  //     dueDate: 'Jan 30, 2025',
  //     progress: 45
  //   },
  //   {
  //     id: '3',
  //     title: 'API Integration Project',
  //     description: 'Integration of third-party APIs for payment processing, analytics, and customer support.',
  //     taskCount: 8,
  //     teamSize: 3,
  //     dueDate: 'Nov 20, 2024',
  //     progress: 90
  //   },
  //   {
  //     id: '4',
  //     title: 'Database Migration',
  //     description: 'Migration from legacy database system to modern cloud-based solution with improved scalability.',
  //     taskCount: 15,
  //     teamSize: 4,
  //     dueDate: 'Feb 10, 2025',
  //     progress: 20
  //   }
  // ];
  
const filteredProjects = projects.filter(project =>
  (project.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
  (project.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
);

  return (
   <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Project Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage and track all your projects in one place
          </p>
        </div>

        <div className="dashboard-actions">
          <div className="search-container">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={() => setShowForm(true)} className="new-project-btn">
            <Plus size={16} />
            New Project
          </button>


          {showForm && (
        <ProjectForm
          onClose={() => setShowForm(false)}
           onSubmit={handleAddProject}
        />
      )}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <div className="no-projects-icon">
              <Search size={24} />
            </div>
            <h3 className="no-projects-title">No projects found</h3>
            <p className="no-projects-text">
              {searchTerm 
                ? 'Try adjusting your search criteria' 
                : 'Get started by creating your first project'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard;


  