import { useContext } from "react";
import { useDrag } from "react-dnd";
import { GlobalContext } from "../context/GlobalState";
import { ItemTypes } from "../context/ItemTypes";

function color(priority) {
  switch (priority) {
    case 3:
      return "#77216F";
    case 2:
      return "#E95420";
    case 1:
      return "#AEA79F";
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
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        border: `1px solid ${color(todo.Priority)}`,
        borderRadius: "6px",
        marginBottom: "5px",
        padding: "5px",
        margin: "5px 10px",
        backgroundColor: isDragging ? "#2C001E" : "#111111",
        opacity: isDragging && "0.5",
        cursor: "grab",
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
      <div style={{ flexGrow: "1", textAlign: "right" }}>
        {new Array(3).fill(0).map((item, idx) => (
          <i
            key={idx}
            className={idx < todo.Priority ? "fi fi-sr-star" : "fi fi-rr-star"}
            style={{ color: color(todo.Priority), cursor: "pointer" }}
            onClick={async () => await priorityShift(idx + 1)}
          ></i>
        ))}
      </div>
    </div>
  );
}
