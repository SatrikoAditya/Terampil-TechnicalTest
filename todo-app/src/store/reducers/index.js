import {SET_TODO, ADD_TODO, DELETE_TODO, GET_BY_ID, UPDATE_TODO, UPDATE_DONE} from '../action-type'
const todoState = {
  todos: [],
  todoById: null
}

function reducer(state = todoState, action) {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state, todos: action.payload
      }
    case ADD_TODO:
      return {
        ...state, 
        todos: state.todos.concat({...state.todos, id: state.todos.length + 1})
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      }
    case GET_BY_ID:
      return {
        ...state,
        todoById: state.todos.filter((todo) => todo.id === action.payload)[0]
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.payload.id ? action.payload: todo))
      }
    case UPDATE_DONE:
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.payload.id ? action.payload: todo))
      }
    default:
      return state
  }
}

export default reducer