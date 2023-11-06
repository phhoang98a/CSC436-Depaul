import React, {useContext, useEffect} from 'react';
import { StateContext } from '../reducer/Contexts';
import { useResource } from "react-request-hook";

function TodoList() {
  const { state, dispatch: dispatchTodo} = useContext(StateContext);
  const {todos} = state;

  const [todoResponse, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  const [updatedTodo, updateTodos] = useResource((todo, dateCompleted) => ({
    url: `/todos/${todo.id}`,
    method: 'patch',
    data: { complete: !todo.complete, dateCompleted }
  }));

  const [deletedTodo, deleteTodo] = useResource((id) => ({
    url: `/todos/${id}`,
    method: 'delete'
  }));

  useEffect(()=>{
    getTodos();
  },[])

  useEffect(() => {
    if (todoResponse && todoResponse.data) {
      dispatchTodo({ type: "FETCH_TODOS", todos: todoResponse.data});
    }
  }, [todoResponse]);

  const handleChange = (todo) => {
    return () => {
      const dateCompleted = Date.now();
      const id = todo.id
      updateTodos(todo, dateCompleted)
      dispatchTodo({type:'TOGGLE_TODO', id, dateCompleted})
    }
  }

  const handleDelete = (id) => {
    return () => {
      deleteTodo(id);
      dispatchTodo({type:'DELETE_TODO', id});
    }
  }

  return (
    <div>
      <h2>Todo List</h2>
      {todos.slice().reverse().map((todo, index) => (
        <div key={index}>
          <label>
            Complete:
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={handleChange(todo)}
            />
          </label>
          <p>Title: {todo.title}</p>
          <p>Description: {todo.description}</p>
          <p>Author: {todo.author}</p>
          <p>Date Created: {new Date(todo.dateCreated).toLocaleString()}</p>
          <p>Date Completed: {todo.complete ? new Date(todo.dateCompleted).toLocaleString() : 'Not completed'}</p>
          <button onClick={handleDelete(todo.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default TodoList;