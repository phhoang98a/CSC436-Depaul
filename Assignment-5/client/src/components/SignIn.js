import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../reducer/Contexts";
import { useResource } from "react-request-hook";

const SignIn = ({ setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState("");
  const { dispatch: dispatchUser} = useContext(StateContext);

  const [user, login] = useResource((username, password) => ({
    url: "/auth/login",
    method: "post",
    data: { username, password },
  }));

  useEffect(()=>{
    if (user && user.isLoading === false && (user.data || user.error)){
      if (user.error){
        setNotification(user.error.data.error)
      } else {
        dispatchUser({ type: "LOGIN", username: user.data.username, accessToken: user.data.accessToken});
      }
    }
  },[user])

  const handleLogin = () => {
    if (!username) {
      alert('username is required');
      return;
    };
    if (!password) {
      alert('password is required');
      return;
    };
    login(username, password);
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
      <h3 style={{color:"red"}}>{notification}</h3>
    </div>
  );
}

export default SignIn;