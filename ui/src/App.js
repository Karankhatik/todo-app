import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false });
  const [isAdding, setIsAdding] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    fetchToDo();
  }, []);

  const fetchToDo = async () => {
    const response = await fetch('http://localhost:5000/todos');
    const data = await response.json();
    console.log("data", data);
    setTodos(data.todos);
  };

  const addToDo = async () => {
    const response = await fetch('http://localhost:5000/todos/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    const data = await response.json();
    setTodos([...todos, data]);
    setIsAdding(false);
    fetchToDo();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/delete-todo/${id}`, {
      method: 'DELETE',
    });
    fetchToDo();
  };

  const updateTodo = async () => {
    const response = await fetch(`http://localhost:5000/todos/update-todo/${currentTodo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: currentTodo.title,
        description: currentTodo.description,
        completed: currentTodo.completed
      }),
    });
    const data = await response.json();
    setTodos(todos.map(todo => (todo._id === data._id ? data : todo)));
    setIsEdit(false);
    setCurrentTodo({});
    fetchToDo();
  };

  const handleEditClick = (todo) => {
    setCurrentTodo(todo);
    setIsEdit(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">ToDo Application</h1>
      <div className="flex justify-end mb-6">
        <button
          disabled={isAdding}
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 disabled:border-red-500 align-right py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left">Title</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left">Description</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left">Status</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo._id} className="border-t">
                <td className="py-2 px-4">{todo.title}</td>
                <td className="py-2 px-4">{todo.description}</td>
                <td className="py-2 px-4">{todo.completed ? 'Done' : 'Pending'}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
            {isAdding && (
              <tr className="border-t">
                <td className="py-2 px-4">
                  <input
                    placeholder="Enter title"
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="border rounded w-full px-2 py-1"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    placeholder="Enter description"
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="border rounded w-full px-2 py-1"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={newTodo.completed}
                    onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })}
                  />
                </td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={addToDo}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(!isAdding);
                      setNewTodo({ title: '', description: '', completed: false });
                    }}
                    className="ml-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Update Todo</h2>
            <input
              value={currentTodo.title}
              onChange={(e) => setCurrentTodo({ ...currentTodo, title: e.target.value })}
              placeholder="Enter title"
              className="border rounded w-full px-2 py-1 mb-4"
            />
            <input
              value={currentTodo.description}
              onChange={(e) => setCurrentTodo({ ...currentTodo, description: e.target.value })}
              placeholder="Enter description"
              className="border rounded w-full px-2 py-1 mb-4"
            />
            <div className="mb-4">
              <input
                type="checkbox"
                checked={currentTodo.completed}
                onChange={(e) => setCurrentTodo({ ...currentTodo, completed: e.target.checked })}
              />
              <label className="ml-2">Completed</label>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={updateTodo}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setIsEdit(false);
                  setCurrentTodo({});
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
