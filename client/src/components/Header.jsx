import { useContext } from "react";
import { useDrop } from "react-dnd";
import { GlobalContext } from "../context/GlobalState";
import { ItemTypes } from "../context/ItemTypes";
import BackButton from "./BackButton";
import AddTodo from "./AddTodo";
import Toaster from "./Toast";

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
    Toaster("Todo deleted!");
    await refreshTodos();
  }

  return (
    <header>
      {!canDrop && <BackButton />}
      <div ref={drop} className="inner-container">
        {canDrop ? (
          <div className={isOver ? "trash-dropzone hovered" : "trash-dropzone"}>
            <i className={isOver ? "fi-rr-trash hovered" : "fi-rr-trash"}></i>
          </div>
        ) : (
          <>
            <h1>What do you need to get done?</h1>
            <AddTodo />
          </>
        )}
      </div>
    </header>
  );
}
