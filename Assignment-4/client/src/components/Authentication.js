import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <h2>Welcome 👋</h2>
      {isLogin
        ? <SignIn setIsLogin={setIsLogin} />
        : <SignUp setIsLogin={setIsLogin}/>
      }
    </div>
  );
}

export default Authentication;