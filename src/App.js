import React, { useState } from "react";
import { Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [tasks, setTasks] = useState([]);

   const categoryMap = {
    Learning: { emoji: "📚", color: "bg-yellow-100 text-yellow-800" },
    Personal: { emoji: "🏠", color: "bg-green-100 text-green-800" },
    Work: { emoji: "💼", color: "bg-blue-100 text-blue-800" },
    Education: { emoji: "🎓", color: "bg-purple-100 text-purple-800" },
    Health: { emoji: "💪", color: "bg-pink-100 text-pink-800" },
  };

  const addTask = () => {
    if (task.trim() === "") {
      toast.error("Please enter a task.");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: task,
      category,
    };
    setTasks([newTask, ...tasks]);
    setTask("");
    toast.success("✅ Task added!");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("🗑️ Task removed!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center p-6">
       <Toaster position="top-center" />

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-700">
        ✅ To-Do App  
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-grow p-3 border rounded focus:outline-none focus:ring"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded focus:outline-none focus:ring"
        >          
        <option value="Select a category">📚 Select a category</option>
          <option value="Learning">📚 Learning</option>
          <option value="Personal">🏠 Personal</option>
          <option value="Work">💼 Work</option>
          <option value="Education">🎓 Education</option>
          <option value="Health">💪 Health</option>
        </select>

        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      <ul className="w-full max-w-2xl space-y-4">
        {tasks.length === 0 && (
          <li className="text-gray-500 text-center">
            No tasks yet. Add one! ✨
          </li>
        )}
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <p className="font-medium text-lg">{t.text}</p>
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${categoryMap[t.category].color}`}
              >
                {categoryMap[t.category].emoji} {t.category}
              </span>
            </div>
            <button
              onClick={() => removeTask(t.id)}
              className="text-red-500 hover:text-red-700"
              aria-label="Delete Task"
            >
              <Trash className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
