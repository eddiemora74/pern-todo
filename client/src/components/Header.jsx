import { useContext } from "react";
import { useDrop } from "react-dnd";
import { GlobalContext } from "../context/GlobalState";
import { ItemTypes } from "../context/ItemTypes";
import AddTodo from "./AddTodo";

export default function Header() {
  const { refreshTodos } = useContext(GlobalContext);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: async (item, monitor) => await deleteTodo(item.id),
      canDrop: () => true,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );

  async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    await refreshTodos();
  }

  return (
    <div
      style={{
        marginRight: "10px",
        marginLeft: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        ref={drop}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 0",
          minHeight: "120px",
        }}
      >
        {canDrop ? (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: isOver ? "2px dashed red" : "2px solid #5E2750",
              borderRadius: "4px",
              padding: "10px 0",
            }}
          >
            <i
              className="fi-rr-trash"
              style={{ fontSize: "2rem", color: isOver ? "red" : "#5E2750" }}
            ></i>
          </div>
        ) : (
          <>
            <h1>What do you need to get done?</h1>
            <AddTodo />
          </>
        )}
      </div>
    </div>
  );
}
