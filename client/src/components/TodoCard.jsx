import { useContext } from "react";
import { useDrag } from "react-dnd";
import { GlobalContext } from "../context/GlobalState";
import { ItemTypes } from "../context/ItemTypes";
import { Colors } from "../context/Branding";

function color(priority) {
  switch (priority) {
    case 3:
      return Colors.LIGHT_AUBERGINE;
    case 2:
      return Colors.UBUNTU_ORANGE;
    case 1:
      return Colors.WARM_GREY;
    default:
      return "initial";
  }
}

export default function TodoCard({ todo }) {
  const { refreshTodos } = useContext(GlobalContext);

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: todo,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [todo]
  );

  async function priorityShift(value) {
    const { Todo, Status } = todo;
    await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        Todo,
        Status,
        Priority: value,
      }),
    });
    await refreshTodos();
  }
  return (
    <div
      ref={isDragging ? dragPreview : drag}
      className="todo-card"
      style={{
        border: `1px solid ${color(todo.Priority)}`,
        backgroundColor: isDragging ? Colors.DARK_AUBERGINE : Colors.TEXT_GREY,
        opacity: isDragging && "0.5",
      }}
    >
      <p
        style={{
          flexGrow: "4",
          textDecoration: todo.Status === 3 && "line-through",
          fontStyle: todo.Status === 3 && "italic",
          opacity: todo.Status === 3 && "0.5",
        }}
      >
        {todo.Todo}
      </p>
      <div className="todo-card__priority-container">
        {new Array(3).fill(0).map((item, idx) => (
          <i
            key={idx}
            className={
              idx < todo.Priority ? "fi fi-sr-circle" : "fi fi-rr-circle"
            }
            style={{
              color: color(todo.Priority),
              cursor: "pointer",
              marginLeft: "1px",
            }}
            onClick={async () => await priorityShift(idx + 1)}
          ></i>
        ))}
      </div>
    </div>
  );
}
