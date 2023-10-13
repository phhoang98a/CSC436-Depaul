import React, {useContext} from 'react';
import { StateContext } from '../reducer/Context';

function TodoList() {
  const { state, dispatch: dispatchTodo} = useContext(StateContext);
  const {todos} = state;
  const handleChange = (index) => {
    return () => {
      dispatchTodo({type:'TOGGLE_TODO', index})
    }
  }

  const handleDelete = (index) => {
    return () => {
      dispatchTodo({type:'DELETE_TODO', index})
    }
  }

  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo, index) => (
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
          <button onClick={handleDelete(index)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default TodoList;