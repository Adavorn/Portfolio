import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  // Load tasks from localStorage initially
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('incomplete');
  const [toast, setToast] = useState('');

  // Save tasks to localStorage on every change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      const toggled = updatedTasks.find((task) => task.id === id);
      if (toggled.completed) {
        setToast(`✅ "${toggled.text}" marked as complete`);
        setTimeout(() => setToast(''), 2000);
      }

      return updatedTasks;
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      <h1>🧠 DevTrack - Task Manager</h1>

      {/* Filter Buttons */}
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>

      {/* Toast Message */}
      {toast && <div className="toast">{toast}</div>}

      {/* Progress Bar */}
      {tasks.length > 0 && (
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(completedCount / tasks.length) * 100}%` }}
          ></div>
        </div>
      )}

      <AddTaskForm onAdd={addTask} />
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;