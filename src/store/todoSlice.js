import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo(state, action) {
            if(action.payload == '') return
            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload,
                completed: false,
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodoComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
            toggledTodo.completed = !toggledTodo.completed
        },
    },
})
export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions
export default todoSlice.reducer