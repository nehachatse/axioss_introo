import "../styles.css";
import { useEffect, useState } from "react";
import TodoInput from "./TodoInput.jsx";
import TodoItems from "./TodoItems.jsx";
import axios from "axios";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [showComplete, setShowComplete] = useState(true);

  // async function getData(){
  //   const config = {
  //     method: "get",
  //     url: "http://localhost:5000/todo"
  //   }

  //   await axios(config)
  //   .then((res) => {
  //     setTodos(res.data)
  //   })
  //   .catch( (err) => console.log(err))
  // }

  // useEffect( () => {
  //   getData();
  // }, [])

  const handleTodoList = (title) => {
    const payload = {
      title: title,
      status: false,
      id: todos.length + 1
    };
    // axios.post("http://localhost:5000/todo", payload);
    // getData();
    setTodos([...todos, payload]);
  };
  console.log(todos);

  const handleDlt = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleToggle = (id) => {
    const updateTodo = todos.map((item) => item.id === id ? {...item, status: !item.status} : item)
    setTodos(updateTodo);
  }
  

  return (
    <div className="App">
      <h1> PERSONALIZE TODO </h1>
      <TodoInput handleTodoList={ handleTodoList} />
      {/* {todos.map((todo) => (
        <TodoItems
          key={todo.id}
          id={todo.id}
          title={todo.title}
          status={todo.status}
          handleDlt={handleDlt}
          handleToggle={handleToggle}
        />
      ))} */}

      <TodoItems data={todos.filter((item) => !item.status)} 
        handleDlt={handleDlt}
        handleToggle={handleToggle} />

      <button className="btn" onClick={() => setShowComplete(!showComplete)}>{showComplete ? "HIDE COMPLETED" : "SHOW COMPLETED"}</button>

      {showComplete && <TodoItems data={todos.filter((item) => item.status)} handleDlt={handleDlt} handleToggle={handleToggle}/>}
    </div>
  );
}
