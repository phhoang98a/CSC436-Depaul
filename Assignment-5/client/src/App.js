import './App.css';
import React, { useReducer } from 'react';
import Authentication from './components/Authentication';
import TodoPage from './components/TodoPage';
import { appReducer } from './reducer/Reducers';
import { StateContext } from './reducer/Contexts';

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: {},
    todos: []
  });
  const { user } = state;
  return (
    <>
      <StateContext.Provider value={{ state, dispatch }}>
        {
          !user.isLogged ?
            <Authentication />
            : <TodoPage/>
        }
      </StateContext.Provider>
    </>

  );
}

export default App;
