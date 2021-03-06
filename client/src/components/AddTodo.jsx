import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function AddTodo() {
  const { refreshTodos } = useContext(GlobalContext);
  const [todo, setTodo] = useState("");

  async function handleAddTodo(value) {
    await fetch("/api/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        Todo: value,
        Status: 1,
        Priority: 1,
      }),
    });
    await refreshTodos();
  }

  return (
    <input
      type="text"
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          handleAddTodo(todo);
          setTodo("");
        }
      }}
      placeholder="Keep on hustling..."
      className="add-todo-input"
      maxLength={255}
    />
  );
}
