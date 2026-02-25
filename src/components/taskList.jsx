import React, { useEffect, useState, useCallback } from "react";
import { getAllTasks, deleteTask, completeTask } from "../services/taskService";
import "./TaskList.css"; // we'll create this CSS

const TaskList = ({ refreshKey, onTaskDeleted }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      onTaskDeleted();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCompleted = async (id) => {
    try {
      await completeTask(id);
      onTaskDeleted();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <h2>Loading tasks...</h2>;

  return (
    <div className="task-list-container">
      <h1 className="task-list-title">Task List</h1>

      {error && <p className="task-error">{error}</p>}
      {!loading && tasks.length === 0 && <p>No tasks found</p>}

      <ul className="task-ul">
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            <div className="task-info">
              <span className="task-id">{task.id}.</span>
              <span className="task-title">{task.title}</span>
              <span
                className={`task-status ${task.completed ? "completed" : "pending"}`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
            </div>

            <div className="task-actions">
              <button
                className="delete-button"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
             
                <button
                  className="complete-button"
                  onClick={() => handleCompleted(task.id)}
                >
                 { task.completed ? "Pending": "Done"  } 
                </button>
              
            </div>
          </li>
        ))}
      </ul>

      {error && (
        <button className="retry-button" onClick={fetchTasks}>
          Retry
        </button>
      )}
    </div>
  );
};

export default TaskList;