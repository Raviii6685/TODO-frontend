import React, { useState } from "react";
import { createTask } from "../services/taskService";

const NewTaskForm = ({ onTaskCreated }) => {
    const [taskName, setTaskName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!taskName.trim()) {
            setError("Task Name is Required");
            return;
        }

        try {
            setLoading(true);
            setError("");
            await createTask(taskName);
            onTaskCreated?.(); // refresh task list
            setTaskName("");
        } catch (error) {
            console.error("Failed to create the task", error);
            setError("Failed to create Task. Try Again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter the Task name"
                disabled={loading}
                className="task-input"
            />

            <button type="submit" disabled={loading} className="task-button">
                {loading ? "Creating..." : "Create Task"}
            </button>

            {error && <p className="task-error">{error}</p>}
        </form>
    );
};

export default NewTaskForm;