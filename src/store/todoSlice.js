import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}){
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            if(!response.ok) {
                throw new Error('Server Error!')
            }
            const data = await response.json()
            return data
        }catch(error){
            return rejectWithValue(error.message)
        }

    }
)
export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}){
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            })
            console.log(response);
            if(!response.ok) {
                throw new Error('Can\'t delete task. Server error.')
            }
            dispatch(removeTodo({id}))
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)
export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function(id, {rejectWithValue, dispatch, getState}){
        const todo = getState().todos.todos.find(todo => todo.id === id)
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            })
            console.log(response);
            if(!response.ok) {
                throw new Error('Can\'t toggle status. Server error.')
            }
            dispatch(toggleTodoComplete({id}))
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)
export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function(title, {rejectWithValue, dispatch}){
        try{
            const todo = {
                title: title,
                userId: 1,
                completed: false,
            }
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            })
            
            if(!response.ok) {
                throw new Error('Can\'t add task. Server error.')
            }
            const data = await response.json()
            console.log(data);
            dispatch(addTodo(data))
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)
const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        loading: false,
        error: false,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodoComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
            toggledTodo.completed = !toggledTodo.completed
        },
    },
    extraReducers: (bilder) => {
        bilder.addCase(fetchTodos.pending, (state) => {
            state.loading = true
            state.error = false
        }),
        bilder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false
            state.todos = action.payload
        }),
        bilder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }),
        bilder.addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }),
        bilder.addCase(toggleStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})
export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions
export default todoSlice.reducer