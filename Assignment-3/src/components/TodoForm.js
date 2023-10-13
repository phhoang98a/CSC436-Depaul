import React, { useContext, useState } from 'react';
import { StateContext } from '../reducer/Context';

function TodoForm( {username }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { dispatch: dispatchTodo} = useContext(StateContext);

  const handleAddTodo = () => {
    if (!title) {
      alert('Title is required');
      return;
    }
    dispatchTodo({
      type:'CREATE_TODO',
      title,
      description,
      author: username
    });
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
        value={username}
        readOnly
      />
      <br></br>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default TodoForm;