import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useNavigate } from "react-router-dom";


function TodoPage({ account }) {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  }
  return (
    <div>
      <h4>
        Hi, {account}
        <button onClick={handleLogOut}>Log out</button>
      </h4>
      <TodoForm account={account} setTodoList={setTodoList} todoList={todoList} />
      <TodoList setTodoList={setTodoList} todoList={todoList}/>
    </div>
  );
}

export default TodoPage;