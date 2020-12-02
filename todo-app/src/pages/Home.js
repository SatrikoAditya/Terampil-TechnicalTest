import {useEffect} from 'react'
import {TodoList} from '../components/'
import {Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getTodo} from '../store/actions/'

export default function Home() {
  const history = useHistory()
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)

  useEffect(() => {
    dispatch(getTodo())
  }, [dispatch])

  const toAdd = () => {
    history.push('/add')
  }

  return (
    <div className="row justify-content-center mt-3 pt-5">
      <div className="div-container">
        <h4>
          <b>My Todo List</b>
          <Button
            variant="primary" 
            size="sm" 
            className="btn float-right"
            onClick={toAdd}>
              Create Todo
          </Button>
        </h4>
        <ul id="todo-container" className="list-unstyled todo">
          {
            todos.map(todo => {
              return (
                <TodoList todo={todo} key={todo.id} />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}