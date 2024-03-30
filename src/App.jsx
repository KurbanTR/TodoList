import { useState } from 'react'
import './App.css'
import TodoList from './commponents/TodoList'
import InputFeald from './commponents/InputFeald'
import { useDispatch } from 'react-redux'
import { addTodo } from './store/todoSlice'

function App() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const addTask = ()=> {
    dispatch(addTodo(text))
    setText('')
  }

  return (
    <>
      <div className='App'>
        <InputFeald text={text} setText={setText} addTodo={addTask}/>
        <TodoList/>
      </div>
    </>
  )
}

export default App
