import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import "./App.css";

function App() {
  const [isClassActiv, setIsClassActive] = useState(true);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDes, setNewDes] = useState("");
  const [completeTodos, setCompleteTodos] = useState([]);

  const onClick = () => {
    setIsClassActive(false);
  };
  const onClick2 = () => {
    setIsClassActive(true);
  };

  // Add a new task to the list
  const addTask = () => {
    if (!newTitle) {
      return alert("PLEASE SPECIFY YOUR TASK");
    }
    let newTodo = {
      title: newTitle,
      des: newDes,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodo);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  // Remove a task from the todo list
  const reduceArr = (a) => {
    let arr = [...allTodos];
    let newArr = [
      ...arr.slice(0, a), // Elements before the index
      ...arr.slice(a + 1), // Elements after the index
    ];
    localStorage.setItem("todolist", JSON.stringify(newArr));
    setAllTodos(newArr);
  };
  const reducecomplete = (a) => {
    let arr = [...completeTodos];
    let newArr = [
      ...arr.slice(0, a), // Elements before the index
      ...arr.slice(a + 1), // Elements after the index
    ];
    localStorage.setItem("completetask", JSON.stringify(newArr));
    setCompleteTodos(newArr);
  };

  const taskComplete = (a) => {
    let arr = [...allTodos];
    let completedTask = arr[a];

    arr.splice(a, 1);

    let updatedCompleteTodos = [...completeTodos, completedTask];

    setAllTodos(arr);
    setCompleteTodos(updatedCompleteTodos);

    localStorage.setItem("todolist", JSON.stringify(arr));
    localStorage.setItem("completetask", JSON.stringify(updatedCompleteTodos));
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompleteTasks = JSON.parse(localStorage.getItem("completetask"));

    if (savedTodo) {
      setAllTodos(savedTodo);
    }
    if (savedCompleteTasks) {
      setCompleteTodos(savedCompleteTasks);
    }
  }, []);

  return (
    <>
      <div className="box">
        <h1 className="logo">MY TODOs</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-items">
              <label>TASK</label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="todo-items">
              <label>DESCRIPTION</label>
              <Input
                value={newDes}
                onChange={(e) => setNewDes(e.target.value)}
              />
            </div>
            <div className="todo-items">
              <Button
                type="primary"
                style={{ backgroundColor: "rgb(5, 199, 5)", color: "black" }}
                onClick={addTask}
              >
                ADD
              </Button>
            </div>
          </div>
          <div className="btn-area">
            <Button
              className={isClassActiv ? "classactive" : "secondarybtn"}
              onClick={onClick2}
            >
              todo
            </Button>
            <Button
              className={isClassActiv ? "secondarybtn" : "classactive"}
              onClick={onClick}
            >
              completed
            </Button>
          </div>

          {isClassActiv && (
            <div className="todo-list">
              {allTodos.map((item, index) => (
                <div className="todo-list-items" key={index}>
                  <div className="todo-list-items-content">
                    <h2>{item.title}</h2>
                    <p>{item.des}</p>
                  </div>
                  <div className="todo-list-items-btn">
                    <DeleteOutlined
                      className="hover-icon"
                      onClick={() => reduceArr(index)}
                    />
                    <CheckOutlined
                      className="hover-icon1"
                      onClick={() => taskComplete(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isClassActiv && (
            <div className="todo-list">
              {completeTodos.map((item, index) => (
                <div className="todo-list-items" key={index}>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.des}</p>
                  </div>
                  <div className="todo-list-items-btn">
                    <DeleteOutlined
                      className="hover-icon"
                      onClick={() => reducecomplete(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
