import React, { useState, useCallback, useEffect } from 'react';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  const fetchData = useCallback(async () => {
    const { todoList: todos } = await fetch('https://backend-js.jongsik.site/api/todo')
      .then((response) => response.json())
      .catch((error) => console.log('Error: ', error));
    setTodoList(todos);
  }, []);

  const handleAdd = useCallback(
    async (todo) => {
      await fetch('https://backend-js.jongsik.site/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todo }),
      });
      setTodoInput('');
      fetchData();
    },
    [fetchData],
  );

  const handleToggle = useCallback(
    (id) => {
      fetch(`https://backend-js.jongsik.site/api/todo/${id}`, {
        method: 'PATCH',
      }).then(() => fetchData());
    },
    [fetchData],
  );

  const handleDelete = useCallback(
    async (id) => {
      await fetch(`https://backend-js.jongsik.site/api/todo/${id}`, {
        method: 'DELETE',
      });
      fetchData();
    },
    [fetchData],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <header className="h-20 flex justify-center items-center bg-gray-100 px-16 lg:justify-start lg:h-28">
        <h1 className="uppercase font-bold text-2xl text-gray-800 lg:text-4xl">Todo</h1>
      </header>
      <div className="h-screen text-center px-12 py-10 lg:text-left">
        <input
          className="w-60 border border-gray-200 h-10 px-2 rounded-md focus:border-gray-400 focus:outline-none lg:w-1/3 lg:px-4 lg:h-14 lg:text-lg"
          placeholder="What's up for today?"
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd(todoInput)}
        />
        <button
          className="ml-2 text-gray-600 bg-gray-200 h-10 px-2 rounded-md border border-gray-300 hover:bg-gray-100 active:bg-gray-300 lg:h-14 lg:text-lg lg:px-4"
          onClick={() => handleAdd(todoInput)}
        >
          Add
        </button>

        <div>test div</div>
        <div className="flex mt-10 text-xl mx-auto lg:space-x-10 lg:justify-between">
          <ul className="text-gray-700 w-full mx-8 lg:w-1/2 lg:mx-0">
            {todoList.map((todo, index) => (
              <li
                className={`${
                  todo.done && 'lg:hidden'
                } flex justify-between text-left mb-2 py-2 px-3 rounded-md shadow-md hover:bg-gray-100 lg:border lg:border-gray-100 lg:px-6 lg:py-4`}
                key={`${index}-${todo.title}`}
              >
                <div>hello</div>
                <span
                  className={`truncate w-60 flex-1 cursor-default ${
                    todo.done ? 'opacity-20 line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
                <span>test</span>
                <div className="space-x-1 lg:space-x-4">
                  <button
                    className="text-sm font-semibold opacity-40 hover:text-green-400 hover:opacity-100 px-1 lg:text-lg"
                    onClick={() => handleToggle(todo._id)}
                  >
                    ✓
                  </button>
                  <button
                    className="opacity-40 hover:text-red-500 hover:opacity-100 px-1 lg:text-xl"
                    onClick={() => handleDelete(todo._id)}
                  >
                    ｘ
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="hidden lg:w-2/5 text-gray-700 w-80 lg:inline-block -translate-y-12 transform">
            <h2 className="text-2xl font-semibold">Done</h2>
            <ul className="w-full mt-4 mx-0 rounded-md">
              {todoList.map((todo, index) => (
                <li
                  className={`${
                    !todo.done ? 'hidden' : ''
                  } flex justify-between bg-gray-200 mb-2 text-left py-2 px-3 rounded-md shadow-md hover:bg-gray-100 lg:border lg:border-gray-100 lg:px-6 lg:py-4`}
                  key={`${index}-${todo.title}`}
                >
                  <span
                    className={`truncate w-60 cursor-default ${
                      todo.done ? 'opacity-20 line-through' : ''
                    } lg:w-3/4`}
                  >
                    {todo.title}
                  </span>
                  <div className="space-x-1 lg:space-x-4">
                    <button
                      className="text-sm font-semibold opacity-40 hover:text-gray-600 hover:opacity-100 px-1"
                      onClick={() => handleToggle(todo._id)}
                    >
                      ⮐
                    </button>
                    <button
                      className="opacity-40 hover:text-red-500 hover:opacity-100 px-1 lg:text-xl"
                      onClick={() => handleDelete(todo._id)}
                    >
                      ｘ
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
