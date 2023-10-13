const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return { ...state, isLogged: true, username: action.username };
    case "LOGOUT":
      return { ...state, isLogged: false };
    default:
      return state;
  }
};

const postReducer = (state, action) =>{
  switch (action.type) {
    case "CREATE_TODO":
      return [...state,{
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: Date.now(),
        complete: false,
        dateCompleted:""
      }];
    case "TOGGLE_TODO":
      return state.map((todo, index)=>{
        return index===action.index
        ? {...todo, dateCompleted: Date.now(), complete:!todo.complete}
        : todo
      })
    case "DELETE_TODO":
      return state.filter((_, index) => index !== action.index);;
    default:
      return state;
  }
}

export function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: postReducer(state.todos, action),
  };
}