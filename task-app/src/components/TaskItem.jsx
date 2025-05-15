import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#aaa' : 'white',
          cursor: 'pointer',
          flex: 1,
        }}
      >
        {task.text}
      </span>
      <button onClick={() => onToggle(task.id)}>✔</button>
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: '10px' }}>
        ❌
      </button>
    </li>
  );
}

export default TaskItem;