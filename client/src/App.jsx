import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Kanban from "./components/Kanban";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Kanban />
    </>
  );
}

export default App;
