import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './components/Authentication';
import TodoPage from './components/TodoPage';

function App() {
  const [account, setAccount] = useState("");
  const [userList, setUserList] = useState([{username:"henry", password: "123"}]);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Authentication setAccount={setAccount} userList={userList} setUserList={setUserList} />} />
        <Route exact path="/todos" element={<TodoPage account={account} />} />
      </Routes>
    </Router>
  );
}

export default App;
