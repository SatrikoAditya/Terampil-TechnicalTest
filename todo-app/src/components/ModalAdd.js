import {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {addToDB} from '../store/actions/'
import moment from 'moment'

export default function Add() {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [due_date, setDate] = useState('')
  const [isDone] = useState(false)
  const [inputError, setInputError] = useState('')

  const handleShow = () => setShow(true)

  const handleClose = () => {
    setShow(false)
    setInputError('')
    setTitle('')
    setDescription('')
    setDate('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {
      title, description, due_date, isDone
    }
    if(!title || !description || !due_date) {
      setInputError('All Field is Required!')
    } else if(moment(moment(due_date).format('LL')).isBefore(moment(new Date()).format('LL'))) {
      setInputError(`Date must be greater than yesterday's date!`)
    } else {
      handleClose()
      dispatch(addToDB(payload))
    }
  }

  return (
    <>
    <Button
      variant="primary" 
      size="sm" 
      className="btn float-right"
      onClick={handleShow}>
        Create Todo
    </Button>
    
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              placeholder="Input Description Here..." />
            {inputError && <h6> {inputError} </h6>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}