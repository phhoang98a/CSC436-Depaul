import React, { useState } from 'react';

function TodoForm({account, setTodoList, todoList}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTodo = () => {
    if (!title) {
      alert('Title is required');
      return;
    }
    setTodoList([...todoList,{
      title,
      description,
      author: account,
      dateCreated: Date.now(),
      complete: false,
      dateCompleted:""
    }]);
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
        value={account}
        readOnly
      />
      <br></br>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default TodoForm;