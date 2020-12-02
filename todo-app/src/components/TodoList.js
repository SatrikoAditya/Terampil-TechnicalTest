import {Button} from 'react-bootstrap'
import {deleteFromDB, getById, updateDoneToDB} from '../store/actions/'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import moment from 'moment'

export default function TodoList({todo}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const {id, title, description, due_date, isDone} = todo

  const handleDelete = (id) => {
    dispatch(deleteFromDB(id))
  }

  const handleUpdate = (id) => {
    dispatch(getById(id))
    history.push(`/update/${id}`)
  }

  const handleDone = (id, title, description, due_date, isDone) => {
    dispatch(updateDoneToDB({id, title, description, due_date, isDone}))
  }

  return (
    <>
      {!isDone && <li id={id} className="todo-list rounded p-3 shadow mt-3 d-flex">
        <div>
          <div onClick={() => handleDone(id, title, description, due_date, isDone)}>
            <h5> <b> {title} </b></h5>
            <h6> {description} </h6>
            <p><b>Due date:</b> {moment(due_date).format('LL')} </p>
          </div>
          <div>
            <Button variant="success" onClick={() => handleUpdate(id)} size="sm" type="button">Update</Button>
            <Button onClick={() => handleDelete(id)} className="ml-2" variant="danger" size="sm" type="button">Delete</Button>
          </div>
        </div>
      </li>}

      {isDone && <li id={id} className="todo-list rounded p-3 shadow mt-3 d-flex">
        <div>
          <div onClick={() => handleDone(id, title, description, due_date, isDone)}>
            <h5 className="line-through"> <b> {title} </b></h5>
            <h6 className="line-through"> {description} </h6>
            <p className="line-through"><b>Due date:</b> {moment(due_date).format('LL')} </p>
          </div>
          <div>
            <Button variant="success" onClick={() => handleUpdate(id)} size="sm" type="button">Update</Button>
            <Button onClick={() => handleDelete(id)} className="ml-2" variant="danger" size="sm" type="button">Delete</Button>
          </div>
        </div>
      </li>}
    </>
  )
}