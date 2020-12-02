import {SET_TODO, ADD_TODO, DELETE_TODO, GET_BY_ID, UPDATE_TODO, UPDATE_DONE} from '../action-type'
import axios from 'axios'


//GET TODO FROM DB AND SET TO REDUX STATE
export function setTodo(payload) {
  return {
    type: SET_TODO,
    payload
  }
}

export function getTodo() {
  return (dispatch) => {
    axios.get('http://localhost:3001/todos')
    .then(({data}) => {
      dispatch(setTodo(data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


//ADD NEW TODO TO DB AND REDUX STATE
export function addTodo(payload) {
  return {
    type: ADD_TODO,
    payload
  }
}

export function addToDB(payload) {
  const {title, description, due_date, isDone} = payload
  return (dispatch) => {
    axios.post('http://localhost:3001/todos', {
      title,
      description,
      due_date,
      isDone
    })
    .then((data) => {
      dispatch(addTodo(payload))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


//DELETE TODO BY ID IN DB AND REDUX STATE
export function deleteTodo(payload) {
  return {
    type: DELETE_TODO,
    payload
  }
}

export function deleteFromDB(id) {
  return (dispatch) => {
    axios.delete(`http://localhost:3001/todos/${id}`)
    .then(_ => {
      dispatch(deleteTodo(id))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


//GET TODO BY ID FROM REDUX STATE
export function getById(payload) {
  return {
    type: GET_BY_ID,
    payload
  }
}


//UPDATE TODO IN DB AND REDUX STATE
export function update(payload) {
  return {
    type: UPDATE_TODO,
    payload
  }
}

export function updateToDB(payload) {
  const {id, title, description, due_date} = payload
  return (dispatch) => {
    axios.patch(`http://localhost:3001/todos/${id}`, {
      title, description, due_date
    })
    .then(_ => {
      dispatch(update(payload))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


//SET DONE FALSE OR TRUE IN DB AND REDUX STATE
export function updateDone(payload) {
  return {
    type: UPDATE_DONE,
    payload
  }
}

export function updateDoneToDB(payload) {
  const {id, title, description, due_date} = payload
  let isDone = true
  if(payload.isDone) isDone = false
  return (dispatch) => {
    axios.patch(`http://localhost:3001/todos/${id}`, {
      isDone
    })
    .then(_ => {
      dispatch(updateDone({id, title, description, due_date, isDone}))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}