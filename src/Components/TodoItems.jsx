import styles from "./TodoItems.module.css";

const compStyle = (status) => {
  console.log("++", status)
  if(status){
    console.log("Im here")
    return {
      border: "7px solid green"
    }
  }
  else{
    console.log("Im hjjje")
    return{
      border: "7px solid orange"
    }
  }
}

const compStatusStyle = (status) => {
  if(status){
    return {
      color : "green",
      textDecoration: "line-through"
    }
  }
}

export default function TodoItems(props) {
  const {data, handleToggle, handleDlt} = props;
  console.log("In TodoItems = ", data);
  const styleStatus = (status) => compStyle(status);
  const compStatus = (status) => compStatusStyle(status);

  return (
    <>
      {data.map((item) => (
        <div key={item.id} className={styles.inputItem_field}>
          <span style={compStatus(item.status)}>{item.title}</span>
          <div className={styles.btn_div}>   
            <button id={item.id} onClick={() => handleToggle(item.id, item.status)} style={styleStatus(item.status)}>
            ✓
            </button>
            <button id={item.id} onClick={() => handleDlt(item.id)}style={{border: "7px solid red", color: "red"}}>
              X
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
