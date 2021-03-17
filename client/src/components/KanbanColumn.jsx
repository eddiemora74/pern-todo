import { useContext } from "react";
import { useDrop } from "react-dnd";
import { Colors } from "../context/Branding";
import { GlobalContext } from "../context/GlobalState";
import { ItemTypes } from "../context/ItemTypes";
import TodoCard from "./TodoCard";
import Toaster from "./Toast";

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
    Toaster("Todo updated!");
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
    Toaster("Cleared completed todos!");
    await refreshTodos();
  }

  return (
    <div ref={drop} className="kanban-column">
      <div className="kanban-column-header">
        <h3
          style={{
            transform: isOver && "scale(1.1)",
            color: isOver && Colors.UBUNTU_ORANGE,
          }}
        >
          {title}
        </h3>
        {status === 3 && (
          <button
            onClick={clearColumn}
            className="kanban-column-header__clear-button"
            style={{
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
        className="kanban-column-items"
        style={{
          border: isOver
            ? `2px dashed ${Colors.UBUNTU_ORANGE}`
            : canDrop
            ? `2px solid ${Colors.COOL_GREY}`
            : `2px solid ${Colors.WARM_GREY}`,
        }}
      >
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
