import './App.css';
import {TodoList} from "./components/TodoList";
import {useCallback, useEffect, useState} from "react";
import {useGetTodoList} from "./hooks/useGetTodoList";
import {AddTodoItem} from "./components/AddTodoItem/AddTodoItem";

function App() {
    const [todoList, setTodoList] = useState([])

    const getTodoList = useGetTodoList()

    const updateTodoList = useCallback(() => {
        getTodoList().then((result) => setTodoList(result.todos))
    }, [getTodoList])

    useEffect(() => {
        updateTodoList()
    }, [updateTodoList])

    return (
    <div className="App">
      <h1>Список задач</h1>
        <TodoList todoList={todoList} updateTodoList={updateTodoList}/>
        <br/>
        <AddTodoItem updateTodoList={updateTodoList}/>
    </div>
  );
}

export default App;
