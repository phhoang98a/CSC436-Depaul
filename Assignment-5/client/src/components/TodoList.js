import React, {useContext, useEffect} from 'react';
import { StateContext } from '../reducer/Contexts';
import { useResource } from "react-request-hook";

function TodoList() {
  const { state, dispatch: dispatchTodo} = useContext(StateContext);
  const {todos, user} = state;

  const [todoResponse, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
    headers: { Authorization: `${user?.accessToken}` },
  }));

  const [updatedTodo, updateTodos] = useResource((todo) => ({
    url: `/todos/${todo.id}`,
    method: 'patch',
    headers: { Authorization: `${user?.accessToken}` },
  }));

  const [deletedTodo, deleteTodo] = useResource((id) => ({
    url: `/todos/${id}`,
    method: 'delete',
    headers: { Authorization: `${user?.accessToken}` },
  }));

  useEffect(()=>{
    getTodos();
  },[])

  useEffect(() => {
    if (todoResponse && todoResponse.isLoading === false && (todoResponse.data || todoResponse.error)){
      if (todoResponse.data){
        const transformedTodos = todoResponse.data.map(todo => {
          return {
            ...todo,
            id: todo._id,
            _id: undefined //remove the _id
          };
        });
        dispatchTodo({ type: "FETCH_TODOS", todos: transformedTodos});
      }  
    }
  }, [todoResponse]);

  useEffect(()=>{
    if (updatedTodo && updatedTodo.isLoading === false && (updatedTodo.data || updatedTodo.error)){
      if (updatedTodo.data){
        dispatchTodo({type:'TOGGLE_TODO', id: updatedTodo.data.id, dateCompleted: updatedTodo.data.dateCompleted})
      }
    }
  },[updatedTodo.data])

  useEffect(()=>{
    if (deletedTodo && deletedTodo.isLoading === false && (deletedTodo.data || deletedTodo.error)){
      if (deletedTodo.data){
        dispatchTodo({type:'DELETE_TODO', id: deletedTodo.data.id});
      }
    }
  },[deletedTodo.data])

  const handleChange = (todo) => {
    return () => {
      updateTodos(todo)
    }
  }

  const handleDelete = (id) => {
    return () => {
      deleteTodo(id);
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