import './App.css';
import React, { useState, useReducer } from 'react';
import Authentication from './components/Authentication';
import TodoPage from './components/TodoPage';
import { appReducer } from './reducer/Reducers';
import { StateContext } from './reducer/Context';

function App() {
  const [userList, setUserList] = useState([{ username: "henry", password: "123" }]);
  const [state, dispatch] = useReducer(appReducer, {
    user: {},
    todos: [],
  });
  const { user } = state;
  return (
    <>
      <StateContext.Provider value={{ state, dispatch }}>
        {
          !user.isLogged ?
            <Authentication userList={userList} setUserList={setUserList} />
            : <TodoPage username={user.username}/>
        }
      </StateContext.Provider>
    </>

  );
}

export default App;
