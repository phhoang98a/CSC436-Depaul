import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../reducer/Contexts';
import { useResource } from "react-request-hook";

function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { dispatch: dispatchTodo, state} = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(({ title, description }) => ({
    url: "/todos",
    method: "post",
    data: { title, description, author: user.username },
    headers: { Authorization: `${user?.accessToken}` },
  }));

  useEffect(()=>{
    if (todo && todo.isLoading === false && (todo.data || todo.error)){
      if (todo.data){
        dispatchTodo({
          type:'CREATE_TODO',
          id: todo.data.id,
          title: todo.data.title,
          author: todo.data.author,
          description: todo.data.description,
          dateCompleted: todo.data.dateCompleted,
          dateCreated: todo.data.dateCreated
        });
      }
    }
  },[todo.data])

  const handleAddTodo = async () => {
    if (!title) {
      alert('Title is required');
      return;
    }
    const newTodo = { title, description };
    createTodo(newTodo);
  };

  return (
    <div>
      <h2>Add new Todo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br></br>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br></br>
      <input
        type="text"
        placeholder="author"
        value={user.username}
        readOnly
      />
      <br></br>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default TodoForm;