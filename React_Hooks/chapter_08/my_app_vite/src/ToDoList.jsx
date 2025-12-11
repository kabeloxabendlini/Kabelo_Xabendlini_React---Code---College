import React, { use, useState } from 'react'
import { Table, Form, Button } from 'react-bootstrap'
import { TodosContext } from './App'

function ToDoList() {
  const { state, dispatch } = use(TodosContext)
  const [todoText, setTodoText] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [editTodo, setEditTodo] = useState(null)
  const buttonTitle = editMode ? "Edit" : "Add"


  const handleSubmit = async (formData) => {
    if(editMode){            
      dispatch({type: 'edit', payload:{...editTodo,text:todoText}})
      setEditMode(false)
      setEditTodo(null)
    }
    else{
        dispatch({type: 'add', payload: todoText})
    }  

    setTodoText("") // to clear field after adding
  }

  return (
    <div style={{ padding: 5 }}>
      <Form action={handleSubmit}>
        <Form.Group controlId="todoForm">
          <Form.Control
            type="text"
            placeholder="Enter To Do"
            onChange={event => setTodoText(event.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {buttonTitle}
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>To Do</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.text}</td>
              <td onClick={() => {
                setTodoText(todo.text)
                setEditMode(true)
                setEditTodo(todo)
              }}>
                Edit
              </td>

              <td onClick={() =>
                dispatch({ type: 'delete', payload: todo })}>Delete</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default ToDoList
