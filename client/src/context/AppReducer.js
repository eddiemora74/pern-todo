// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload,
      };
    case "ADD_TODO":
      const addTodoResponse = [...state.todos, action.payload];
      addTodoResponse.sort((a, b) => a.Priorty + b.Priority);
      addTodoResponse.sort((a, b) => a.id - b.id);
      return {
        todos: addTodoResponse,
      };
    default:
      return state;
  }
};
