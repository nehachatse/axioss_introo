import "../styles.css";
import { useEffect, useState } from "react";
import TodoInput from "./TodoInput.jsx";
import TodoItems from "./TodoItems.jsx";
import axios from "axios";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [showComplete, setShowComplete] = useState(true);

  async function getData(){
    const config = {
      method: "get",
      url: "http://localhost:5000/todo"
    }

    await axios(config)
    .then((res) => {
      setTodos(res.data)
    })
    .catch( (err) => console.log(err))
  }

  useEffect( () => {
    getData();
  }, [])

  const handleTodoList = async (title) => {
    const payload = {
      title: title,
      status: false
    };
    await axios.post("http://localhost:5000/todo", payload)
    .then((res) => getData())
    .catch((err) => console.log(err));
    // setTodos([...todos, payload]);
  };
  console.log("first=",todos);

  const handleDlt = async (id) => {
    await axios.delete(`http://localhost:5000/todo/${id}`)
    .then((res) => getData())
    .catch((err) => console.log(err))
  };

  const handleToggle = async (id, statuss) => {
    console.log("toggle tigger=", id);

    await axios.patch(`http://localhost:5000/todo/${id}`,{status: !statuss})
    .then((res) => getData())
    .catch((err) => console.log(err));
    // const updateTodo = todos.map((item) => item.id === id ? {...item, status: !item.status} : item)
    // setTodos(updateTodo);
  }
  

  return (
    <div className="App">
      <h1> PERSONALIZE TODO </h1>
      <TodoInput handleTodoList={ handleTodoList} />

      <TodoItems data={todos.filter((item) => !item.status)} 
        handleDlt={handleDlt}
        handleToggle={handleToggle} />

      <button className="btn" onClick={() => setShowComplete(!showComplete)}>{showComplete ? "HIDE COMPLETED" : "SHOW COMPLETED"}</button>

      {showComplete && <TodoItems data={todos.filter((item) => item.status)} handleDlt={handleDlt} handleToggle={handleToggle}/>}
    </div>
  );
}
