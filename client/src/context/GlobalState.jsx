import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const INITIAL_STATE = {
  todos: [],
};

export const GlobalContext = createContext(INITIAL_STATE);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);

  async function refreshTodos() {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  }

  function setTodos(todos) {
    dispatch({
      type: "SET_TODOS",
      payload: todos,
    });
  }

  function addTodo(todo) {
    dispatch({
      type: "ADD_TODO",
      payload: todo,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        todos: state.todos,
        setTodos,
        addTodo,
        refreshTodos,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
