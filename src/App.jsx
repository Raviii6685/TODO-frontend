import { useState } from "react";
import "./App.css";
import TaskList from "./components/taskList";
import NewTaskForm from "./components/NewTaskForm";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="app-container">
      <div className="app-card">
        <h1 className="app-title">✨ Task Manager</h1>

        <NewTaskForm onTaskCreated={triggerRefresh} />

        <TaskList
          refreshKey={refreshKey}
          onTaskDeleted={triggerRefresh}
        />
      </div>
    </div>
  );
}

export default App;