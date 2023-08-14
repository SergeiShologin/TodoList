import "./styles.css"

import {Loader} from "../ui/loader";
import {useState} from "react";
import {Modal} from "../ui/modal";
import {useFetchTodo} from "../../hooks/useFetchTodo";

export const TodoList = ({ todoList, updateTodoList }) => {
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState("")
    const [newTitle, setNewTitle] = useState("")

    const deletedItem = useFetchTodo("http://localhost:3002/api/todos/delete", "delete")
    const deleteTodoItem = async (title) => {
        await deletedItem({title: title});
        updateTodoList();
    };

    const editedItem = useFetchTodo("http://localhost:3002/api/todos/edit", "put")
    const editTodoItem = async (id, newTitle) => {
        await editedItem({id: id, newTitle: newTitle});
        updateTodoList();
    }

    const onShow = (id) => {
        setShowModal(true)
        setId(id)
    }

    const onClose = () => {
        setShowModal(false)
    }

    const onSave = async () => {
        await editTodoItem(id, newTitle);
        onClose();
        setNewTitle("")
    };

    return (
        <div className="todo-list">
            {!todoList.length && <Loader/>}
            {todoList.map((item) => (
                <div key={item._id} className="todo-item">
                    <span className="todo-item-title">{item.title}</span>
                    <button className="todo-item-delete" onClick={() => deleteTodoItem(item.title)}>Удалить</button>
                    <button className="todo-item-edit" onClick={() => onShow(item._id)}>Редактировать</button>
                </div>
            ))}
            {
                showModal &&
                <Modal>
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Редактирование задачи</h2>
                            <input
                                type="text"
                                placeholder="Введите название новой задачи"
                                onChange={(event) => setNewTitle(event.target.value)}
                            />
                            <div className="buttons">
                                <button onClick={onSave} disabled={!newTitle}>Сохранить</button>
                                <button onClick={onClose}>Отмена</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    );
};