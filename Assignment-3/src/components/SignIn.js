import React, { useState } from "react";

const SignIn = ({ dispatchUser, userList, setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState("");
  const handleLogin = () => {
    if (!username) {
      alert('username is required');
      return;
    };
    if (!password) {
      alert('password is required');
      return;
    };
    const userIndex = userList.findIndex(u => u.username === username && u.password===password);
    if (userIndex===-1){
      setNotification("Your username or password is invalid")
    } else {
      dispatchUser({ type: 'LOGIN', username })
    }
  };

  return (
    <div>
      <div style={{textDecoration:"underline"}} onClick={()=>setIsLogin(false)}>New customer? Click here to register</div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <h4> You can sign in the default account (username:henry, password:123)</h4>
      <h3 style={{color:"red"}}>{notification}</h3>
    </div>
  );
}

export default SignIn;