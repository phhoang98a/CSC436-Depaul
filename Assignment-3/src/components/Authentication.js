import React, { useContext, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { StateContext } from "../reducer/Context";

const Authentication = ({userList, setUserList}) => {
  const [isLogin, setIsLogin] = useState(true);
  const { dispatch: dispatchUser} = useContext(StateContext);
  return (
    <div>
      <h2>Welcome 👋</h2>
      {isLogin
        ? <SignIn dispatchUser={dispatchUser} userList={userList} setIsLogin={setIsLogin} />
        : <SignUp dispatchUser={dispatchUser} setUserList={setUserList} setIsLogin={setIsLogin}/>
      }
    </div>
  );
}

export default Authentication;