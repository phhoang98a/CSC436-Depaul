import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Authentication = ({setAccount, userList, setUserList}) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <h2>Welcome 👋</h2>
      {isLogin
        ? <SignIn setIsLogin={setIsLogin} userList={userList} setAccount={setAccount} />
        : <SignUp setIsLogin={setIsLogin} userList={userList} setUserList={setUserList}/>
      }
    </div>
  );
}

export default Authentication;