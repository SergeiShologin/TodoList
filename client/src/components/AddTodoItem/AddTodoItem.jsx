import {useState} from "react";
import {useFetchTodo} from "../../hooks/useFetchTodo";

import "./styles.css"

export const AddTodoItem = ({ updateTodoList }) => {
    const [title, setTitle] = useState("")

    const addedItem = useFetchTodo("http://localhost:3002/api/todos/add", "POST");
    const onSubmit = async (e) => {
        e.preventDefault()
        await addedItem({title: title})
        updateTodoList()
        setTitle("")
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Добавить задачу" value={title} onChange={(event) => setTitle(event.target.value)}/>
            <br/>
            <br/>
            <button type="submit" disabled={!title}>Добавить</button>
        </form>
    )
}