import {useEffect, useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {updateToDB} from '../store/actions/'

export default function Update() {
  const dispatch = useDispatch()
  const history = useHistory()
  
  const todoById = useSelector((state) => state.todoById)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [due_date, setDate] = useState('')
  const [inputError, setInputError] = useState('')

  useEffect(() => {
    if(todoById) {
      setTitle(todoById.title)
      setDescription(todoById.description)
      setDate(todoById.due_date)
    }
  }, [todoById])

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {
      title, description, due_date, id: todoById.id
    }
    if(!title || !description || !due_date) {
      setInputError('All Field is Required!')
    } else {
      dispatch(updateToDB(payload))
      history.push('/')
    }
  }

  const handleClose = (event) => {
    event.preventDefault()
    history.push('/')
  }

  return (
    <div className="div-container mt-5">
      <h4><b>Create New Todo</b></h4>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control 
            value={title} 
            onChange={(event) => setTitle(event.target.value)} 
            type="text" 
            placeholder="Input Title Here..." />
        </Form.Group>
        <Form.Group>
          <Form.Label>Due Date</Form.Label>
          <Form.Control 
            value={due_date} 
            onChange={(event) => setDate(event.target.value)} 
            type="date" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control 
            value={description} 
            onChange={(event) => setDescription(event.target.value)} 
            as="textarea" 
            rows={3}
            placeholder="Input Title Here..." />
        </Form.Group>
        {inputError && <h6> {inputError} </h6>}
        <div className="float-right">
          <Button onClick={handleClose} variant="danger">Cancel</Button>
          <Button onClick={handleSubmit} variant="success" className="ml-2">Submit</Button>
        </div>
      </Form>
    </div>
  )
}