import { useState,useEffect } from 'react';
import './App.css';


function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []
    return JSON.parse(localValue)
  });
  const [cls,setCls] = useState(todos);



  useEffect(()=>{
    localStorage.setItem("ITEMS",JSON.stringify(todos))
  },[todos])

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
  function toggleTodo(id,completed) {
    setTodos(currenTodos=>{
      return currenTodos.map(todo=>{
        if(todo.id===id){
          return {...todo,completed}
        }
        return todo;
      })

    })
  }

  function deleteTodo(id){
    setTodos(currenTodos=>{
      return currenTodos.filter(todo=>todo.id!==id)
    })

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
      {todos.length === 0 &&"no todos"}
      {todos.map(todo=>{
        return(
        <li key={todo.id}>
        <label>
        <input type="checkbox" defaultChecked={todo.completed} 
        onChange={e=> toggleTodo(todo.id,e.target.checked)}/>
        {todo.title}
    

        </label>
        <button className='btn btn-danger' onClick={()=>deleteTodo(todo.id)}>Delete</button>
        
      </li>
        )

      })}
      
      
    </ul>
    </>
  );
}

export default App;
