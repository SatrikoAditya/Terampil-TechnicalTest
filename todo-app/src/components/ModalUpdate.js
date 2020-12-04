import {useEffect, useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {updateToDB, getById} from '../store/actions/'
import moment from 'moment'

export default function ModalUpdate({id}) {
  const dispatch = useDispatch()
  const todoById = useSelector((state) => state.todoById)
  
  const [show, setShow] = useState(false)
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

  const handleShow = (id) => {
    dispatch(getById(id))
    setShow(true)
  } 

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
      title, description, due_date, id: todoById.id
    }
    if(!title || !description || !due_date) {
      setInputError('All Field is Required!')
    } else if(moment(moment(due_date).format('LL')).isBefore(moment(new Date()).format('LL'))) {
      setInputError(`Date must be greater than yesterday's date!`)
    } else {
      dispatch(updateToDB(payload))
      handleClose()
    }
  }

  return (
    <>
      <Button 
        variant="success" 
        onClick={() => handleShow(id)} 
        size="sm"
        className="mr-2" 
        type="button">
          Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
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
                placeholder="Input Title Here..." />
              {inputError && <h6> {inputError} </h6>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}