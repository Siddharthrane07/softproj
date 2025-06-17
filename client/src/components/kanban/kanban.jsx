import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './kanban.css';
import { useParams } from 'react-router-dom';
import { User, Calendar } from 'lucide-react';
import EditModal from './EditModel.js'

const KanbanBoard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/api/project/projectdetails/${projectId}`, {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);
  
  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleSaveEdit = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:8800/api/project/projectdetails/${updatedTask.id}`, updatedTask, {
        withCredentials: true,
      });
      setEditTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };



  const columns = {
    todo: "To Do",
    inProgress: "In Progress",
    done: "Completed"
  };

  const getColumnTasks = (status) => tasks.filter(t => t.status === status);

  return (
    <div className="kanban-board">
      {Object.entries(columns).map(([key, label]) => (
        <div key={key} className="kanban-column">
          <h3 className="kanban-column-title">{label}</h3>
          {getColumnTasks(key).map(task => (
            <div className="task-card" key={task.id} onClick={() => handleEdit(task)}>
              <div className="task-card-header">
                <h4 className="task-card-title">{task.title}</h4>
                <span className={`task-card-priority priority-${task.priority?.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>
              {task.description && (
                <p className="task-card-description">{task.description}</p>
              )}
              <div className="task-card-meta">
                <div className="task-card-meta-item">
                  <User size={12} />
                  <span>{task.person}</span>
                </div>
                <div className="task-card-meta-item">
                  <Calendar size={12} />
                  <span>{task.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {editTask && (
        <EditModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
