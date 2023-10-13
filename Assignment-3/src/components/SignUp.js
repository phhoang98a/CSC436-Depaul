import React, { useState } from "react";

const SignUp = ({ dispatchUser, setUserList, setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState("");
  const handleSignUp = () => {
    if (!username) {
      alert('Title is required');
      return;
    };
    if (!password) {
      alert('password is required');
      return;
    };
    setUserList(prevState=>[...prevState,{
      username,
      password
    }]);
    dispatchUser({ type: 'REGISTER', username })
    setNotification("You registered successfully");
  };

  return (
    <div>
      <div style={{ textDecoration: "underline" }} onClick={() => setIsLogin(true)}>You registed an account. Click here to sign in</div>
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
      <button onClick={handleSignUp}>SignUp</button>
      <h3 style={{color:"green"}}>{notification}</h3>
    </div>
  );
}

export default SignUp;