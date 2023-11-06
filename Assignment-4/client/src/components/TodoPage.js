import React, { useContext } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { StateContext } from '../reducer/Contexts';

function TodoPage() {
  const { dispatch: dispatchUser, state } = useContext(StateContext);
  const { user } = state;
  const handleLogOut = () => {
    dispatchUser({type:'LOGOUT'})
  }
  return (
    <div>
      <h4>
        Hi, {user.username}
        <button onClick={handleLogOut}>Log out</button>
      </h4>
      <TodoForm/>
      <TodoList/>
    </div>
  );
}

export default TodoPage;