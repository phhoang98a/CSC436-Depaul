import React, { useState, useEffect } from "react";
import { StateContext } from "../reducer/Contexts";
import { useResource } from "react-request-hook";

const SignUp = ({ setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState("");
  const [color, setColor] = useState("red");

  const [user, register] = useResource((username, password) => ({
    url: "/auth/register",
    method: "post",
    data: {  username, password }
  }));

  useEffect(()=>{
    if (user && user.isLoading === false && (user.data || user.error)){
      if (user.error){
        setNotification(user.error.data.error);
        setColor("red");
      } else {
        setNotification(user.data.message);
        setColor("green");
      }
    }
  },[user])

  const handleSignUp = () => {
    if (!username) {
      alert('username is required');
      return;
    };
    if (!password) {
      alert('password is required');
      return;
    };
    register(username, password);
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
      <h3 style={{color:color}}>{notification}</h3>
    </div>
  );
}

export default SignUp;