import { useState } from 'react';
import './App.css';

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [cls,setCls] = useState(todos);

  function handleSubmit(e){
    e.preventDefault();
    setTodos(currentTodos=>{
      return [...currentTodos,
        {
          id:crypto.randomUUID(),title:newItem,completed:false
        },
      ]
    })
    setNewItem("");

  }
  function clearscreen() {
    setCls("");
  }
  
  
  return (
    <>

    <form onSubmit={handleSubmit} className="new-item-form">
      <div className='form-row'>
        <label>New Item</label>
        <input value={newItem} onChange={e=>setNewItem(e.target.value)} type="text" id='item' />
      </div>
      <button className="btn" onClick={clearscreen}>Add</button>
      
    </form>
    <h1 className="header">Todo List</h1>
    <ul className="list">
      {todos.map(todo=>{
        return(
        <li key={todo.id}>
        <label>
        <input type="checkbox" defaultChecked={todo.completed} />
        {todo.title}
    

        </label>
        <button className='btn btn-danger'>Delete</button>
        
      </li>
        )

      })}
      
      
    </ul>
    </>
  );
}

export default App;
