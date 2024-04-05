import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './commponents/TodoList'
import InputFeald from './commponents/InputFeald'
import { useDispatch, useSelector } from 'react-redux'
import { addNewTodo, fetchTodos } from './store/todoSlice'

function App() {
  const [text, setText] = useState('')
  const {loading, error} = useSelector(state => state.todos)
  const dispatch = useDispatch()

  const addTask = () => {
    dispatch(addNewTodo(text))
    setText('')
  }

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <>
      <div className='App'>
        <InputFeald text={text} setText={setText} addTodo={addTask}/>
        {loading && <h2>Loading...</h2>}
        {error && <h2>An error occured: {error}</h2>}
        <TodoList/>
      </div>
    </>
  )
}

export default App
