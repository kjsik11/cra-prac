import React, { useState } from 'react';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  return (
    <div>
      <p className="text-xl font-bold mb-16">TODO LIST</p>
      {todoList.length !== 0 &&
        todoList.map((todoItem, idx) => (
          <div className="flex justify-between mb-2" key={`${todoItem}-${idx}`}>
            {todoItem.complete ? (
              <p className="text-lg font-bold mr-4 text-gray-300 line-through">{todoItem.title}</p>
            ) : (
              <p className="text-lg font-bold mr-4">{todoItem.title}</p>
            )}

            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setTodoList(
                    todoList.map((val) => {
                      if (val.title === todoItem.title)
                        return { title: todoItem.title, complete: !todoItem.complete };
                      else return val;
                    }),
                  )
                }
                className="bg-blue-600 px-2 py-1 text-white"
              >
                {todoItem.complete ? 'undo' : 'done'}
              </button>
              <button
                onClick={() => {
                  setTodoList((prev) => prev.filter((val) => val.title !== todoItem.title));
                }}
                className="bg-red-600 px-2 py-1 text-white"
              >
                delete
              </button>
            </div>
          </div>
        ))}

      <form className="flex space-x-4 mt-20">
        <input
          className="rounded-md border border-gray-400 px-2"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={!todoInput}
          onClick={() => {
            setTodoList([...todoList, { title: todoInput, complete: false }]);
            setTodoInput('');
          }}
          className="rounded-md px-2 py-1 border border-gray-200 bg-blue-400 text-white"
        >
          add todo
        </button>
      </form>
    </div>
  );
};

export default Todo;
