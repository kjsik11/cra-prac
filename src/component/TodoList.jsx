import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function TodoLists() {
  const url = 'https://backend-js.jongsik.site/api/todo';
  const [todoList, setTodoList] = useState([]);
  const [TodoData, setTodoData] = useState('');

  const getData = useCallback(async () => {
    await axios
      .get(url)
      .then((res) => {
        const { todoList } = res.data;
        console.log(res.data);
        setTodoList(todoList);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAdd = useCallback(
    async (title) => {
      const data = {
        headers: {
          'Content-Type': 'application/json',
        },
        title: title,
      };
      try {
        const res = await axios.post(url, data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
      setTodoData('');
      getData();
    },
    [getData],
  );

  const handleDone = useCallback(
    async (_id) => {
      try {
        const res = await axios.patch(`${url}/${_id}`);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
      getData();
    },
    [getData],
  );

  const handleDelete = useCallback(
    async (_id) => {
      try {
        const res = await axios.delete(`${url}/${_id}`);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
      getData();
    },
    [getData],
  );

  useEffect(() => {
    getData().catch(console.error);
  }, [getData]);

  return (
    <>
      <header className="h-20 bg-blue-100 flex justify-center items-center px-16 lg:justify-center lg:h-28">
        <h1 className="uppercase font-black text-2xl text-black-800 lg:text-4xl">TodoList</h1>
      </header>
      <div className="h-screen text-center px-12 py-10 lg:text-center">
        <input
          className="ring-4 h-10 px-2 rounded-md focus:border-blue-200 focus:outline-none lg:w-1/3 lg:px-4 lg:h-14 lg:text-lg"
          placeholder="Input Text"
          type="text"
          value={TodoData}
          onChange={(event) => setTodoData(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleAdd(TodoData)}
        />
        <button
          className="ml-2 text-blue-600 bg-blue-200 h-10 px-2 rounded-md border border-blue-300 hover:bg-blue-100 active:bg-blue-300 lg:h-14 lg:text-lg lg:px-4"
          onClick={() => handleAdd(TodoData)}
        >
          ADD
        </button>
        <div className="flex mt-10 text-xl mx-auto lg:space-x-10 lg:justify-between">
          <ul className="text-gray-700 w-full mx-8 lg:w-1/2 lg:mx-0">
            {todoList &&
              todoList.map((todo) => (
                <li
                  className={`${
                    todo.done && 'lg:hidden'
                  } flex justify-between text-left mb-2 py-2 px-3 rounded-md shadow-md hover:bg-gray-100 lg:border lg:border-gray-100 lg:px-6 lg:py-4`}
                  key={todo.title}
                >
                  <span
                    className={`truncate w-60 flex-1 cursor-default ${
                      todo.done ? 'opacity-20 line-through' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                  <div className="space-x-1 lg:space-x-4">
                    <button
                      className="text-sm opacity-40 hover:text-green-500 hover:opacity-100 px-1 lg:text-xl"
                      onClick={() => handleDone(todo._id)}
                    >
                      T
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
          <div className="hidden lg:w-2/5 text-gray-700 w-80 lg:inline-block -translate-y-4 transform">
            <ul className="w-full mt-4 mx-0 rounded-md">
              {todoList &&
                todoList.map((todo) => (
                  <li
                    className={`${
                      !todo.done ? 'hidden' : ''
                    } flex justify-between bg-gray-200 mb-2 text-left py-2 px-3 rounded-md shadow-md hover:bg-gray-100 lg:border lg:border-gray-100 lg:px-6 lg:py-4`}
                    key={todo.title}
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
                        className="text-xs font-semibold opacity-40 hover:text-green-600 hover:opacity-100 px-1"
                        onClick={() => handleDone(todo._id)}
                      >
                        F
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
}

export default TodoLists;
