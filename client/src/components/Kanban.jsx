import { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import KanbanColumn from "./KanbanColumn";

export default function Kanban() {
  const { todos, refreshTodos } = useContext(GlobalContext);

  useEffect(() => refreshTodos(), []);

  const todos_Todo = todos.filter((todo) => todo.Status === 1);
  const todos_Prog = todos.filter((todo) => todo.Status === 2);
  const todos_Comp = todos.filter((todo) => todo.Status === 3);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexGrow: "1",
        overflowY: "scroll",
      }}
    >
      <KanbanColumn title="To do" status={1} todos={todos_Todo} />
      <KanbanColumn title="In progress" status={2} todos={todos_Prog} />
      <KanbanColumn title="Completed" status={3} todos={todos_Comp} />
    </div>
  );
}
