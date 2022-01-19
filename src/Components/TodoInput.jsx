import {useState} from 'react';
import styles from './TodoInput.module.css'

export default function TodoInput({handleTodoList}){
  const [text, setText] = useState("");
  const handleInput = (e) => {
    setText(e.target.value);
  }
  const handleAdd = () => {
    handleTodoList(text);
  }
  return (
    <div className={styles.input_div}>
      <input type="text" placeholder="Enter todo" value={text} onChange={handleInput} className={styles.input_field}/>
      <button onClick={handleAdd} className={styles.btn}>+</button>
    </div>
  )
}