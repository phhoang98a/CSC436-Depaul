import React from 'react';

function TodoList({ setTodoList, todoList }) {

  const handleChange = (index) => {
    return () => {
      const updatedList = [...todoList];

      // Update the object at the specified index.
      updatedList[index] = {
        ...updatedList[index],
        dateCompleted: Date.now(),
        complete: !updatedList[index].complete
      }
      setTodoList(updatedList);
    }
  }

  return (
    <div>
      <h2>Todo List</h2>
      {todoList.map((todo, index) => (
        <div key={index}>
          <label>
            Complete:
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={handleChange(index)}
            />
          </label>
          <p>Title: {todo.title}</p>
          <p>Description: {todo.description}</p>
          <p>Author: {todo.author}</p>
          <p>Date Created: {new Date(todo.dateCreated).toLocaleString()}</p>
          <p>Date Completed: {todo.complete ? new Date(todo.dateCompleted).toLocaleString() : 'Not completed'}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default TodoList;