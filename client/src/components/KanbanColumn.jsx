import { useContext } from "react";
import { useDrop } from "react-dnd";
import { GlobalContext } from "../context/GlobalState";
import { ItemTypes } from "../context/ItemTypes";
import TodoCard from "./TodoCard";

export default function KanbanColumn({ title, status, todos }) {
  const { refreshTodos } = useContext(GlobalContext);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: async (item, monitor) => await updateStatus(item, status),
      canDrop: () => true,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );

  async function updateStatus(payload, newStatus) {
    const { id, Todo, Priority } = payload;
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        Todo,
        Priority,
        Status: newStatus,
      }),
    });
    await refreshTodos();
  }

  async function clearColumn() {
    await fetch(`/api/todos`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        column: "Status",
        value: status,
      }),
    });
    await refreshTodos();
  }

  return (
    <div
      ref={drop}
      style={{
        width: "100%",
        paddingLeft: "10px",
        paddingRight: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 10px",
        }}
      >
        <h3>{title}</h3>
        {status === 3 && (
          <button
            onClick={clearColumn}
            style={{
              fontFamily: "inherit",
              backgroundColor: "transparent",
              fontSize: "16px",
              border: "2px solid #E95420",
              color: "#E95420",
              borderRadius: "4px",
              opacity: !todos.length && "0.4",
              cursor: !todos.length ? "not-allowed" : "pointer",
            }}
            disabled={!todos.length && true}
          >
            <i className="fi-rr-broom"></i>
          </button>
        )}
      </div>

      <div
        style={{
          backgroundColor: "#333333",
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          border: isOver
            ? "2px dashed #E95420"
            : canDrop
            ? "2px solid #333333"
            : "2px solid #AEA79F",
          borderRadius: "4px",
        }}
      >
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
