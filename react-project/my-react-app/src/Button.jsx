import React, { useState, useEffect } from "react";

function Button() {
  const [tasks, setTasks] = useState(() => {
    // Retrieve tasks from localStorage on initial render
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    const newTask = document.getElementById("taskInput").value;
    if (newTask.trim() === "") return; // Avoid adding empty tasks
    document.getElementById("taskInput").value = "";

    setTasks([...tasks, { text: newTask, completed: false }]);
  }

  function handleRemoveTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function handleCompleteTask(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="container">
      <ul className="taskList">
        {tasks.map((task, index) => (
          <li key={index} className="listItem">
            <span
              className={`taskText ${task.completed ? "completed" : ""}`}
            >
              {task.text}
            </span>
            <button
              className="completeButton"
              onClick={() => handleCompleteTask(index)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              className="deleteButton"
              onClick={() => handleRemoveTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="inputContainer">
        <input
          type="text"
          id="taskInput"
          placeholder="Enter a new task"
          className="input"
        />
        <button onClick={handleAddTask} className="addButton">
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Button;
