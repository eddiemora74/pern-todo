import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function AddTodo() {
  const { refreshTodos } = useContext(GlobalContext);
  const [todo, setTodo] = useState("");
  const [focus, setFocus] = useState(false);

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
      style={{
        minWidth: "300px",
        backgroundColor: "#000",
        color: "#E95420",
        fontFamily: "inherit",
        fontSize: "1rem",
        outline: "none",
        border: "none",
        borderBottom: focus ? "2px solid #E95420" : "2px solid #5E2750",
      }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
}
