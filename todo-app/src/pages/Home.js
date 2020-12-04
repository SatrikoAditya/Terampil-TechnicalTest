import {useEffect} from 'react'
import {TodoList, ModalAdd} from '../components/'
import {useDispatch, useSelector} from 'react-redux'
import {getTodo} from '../store/actions/'

export default function Home() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)

  useEffect(() => {
    dispatch(getTodo())
  }, [dispatch])

  return (
    <div className="row justify-content-center mt-3 pt-5">
      <div className="div-container">
        <h4>
          <b>My Todo List</b>
          <ModalAdd />
        </h4>
        {todos.length === 0 && <div className="div-container mt-5">
          <h5><b>There's Nothing To Do</b></h5>
        </div>}
        {todos.length > 0 && <ul id="todo-container" className="list-unstyled todo">
          {
            todos.map(todo => {
              return (
                <TodoList todo={todo} key={todo.id} />
              )
            })
          }
        </ul>}
      </div>
    </div>
  )
}