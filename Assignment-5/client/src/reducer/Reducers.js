const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogged: true, username: action.username, accessToken: action.accessToken };
    // case "REGISTER":
    //   return { ...state, isLogged: true, username: action.username };
    case "LOGOUT":
      return { ...state, isLogged: false };
    default:
      return state;
  }
};

const postReducer = (state, action) =>{
  switch (action.type) {
    case "FETCH_TODOS":
      return action.todos;
    case "CREATE_TODO":
      return [...state,{
        id: action.id,
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: action.dateCreated,
        complete: false,
        dateCompleted: action.dateCompleted
      }];
    case "TOGGLE_TODO":
      return state.map((todo)=>{
        return todo.id===action.id
        ? {...todo, dateCompleted: action.dateCompleted, complete:!todo.complete}
        : todo
      })
    case "DELETE_TODO":
      return state.filter((todo ) => todo.id !== action.id);;
    default:
      return state;
  }
}

const userListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, {username: action.username, password: action.password}];
    default:
      return state;
  }
};

export function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: postReducer(state.todos, action),
    userList: userListReducer(state.userList, action)
  };
}