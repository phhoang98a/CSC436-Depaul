import React, { useContext } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { StateContext } from '../reducer/Context';

function TodoPage({ username }) {
  const { dispatch: dispatchUser} = useContext(StateContext);
  const handleLogOut = () => {
    dispatchUser({type:'LOGOUT'})
  }
  return (
    <div>
      <h4>
        Hi, {username}
        <button onClick={handleLogOut}>Log out</button>
      </h4>
      <TodoForm username={username} />
      <TodoList/>
    </div>
  );
}

export default TodoPage;