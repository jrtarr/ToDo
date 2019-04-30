import uuidv4 from 'uuid/v4'
import {renderToDos} from './views'

// Read todos from localStorage
const loadToDos = () => {
    const todoJSON = localStorage.getItem('todos')
    try{
        return todoJSON ? JSON.parse(todoJSON) : []
    }catch (e){
        return [] 
    }
}

// Save todos to localStorage
const saveToDos = () => {
    localStorage.setItem('todos',JSON.stringify(todos))
}

//Return todos array
const getToDos = () => todos

//Create ToDo
const createToDo = (text) => {
    if (text){
        todos.push({
            id: uuidv4(),
            text,
            completed: false
        })
        saveToDos()
        renderToDos()
    }
}

// Remove ToDo
const removeTodo = (id) => {
    const i = todos.findIndex((todo) => todo.id === id)
    if (i > -1){
        todos.splice(i,1)
    }
    saveToDos()
    renderToDos()
}

// Adjust values based on checkbox
const markComplete = (id) => {
    const toChange = todos.find((todo) => todo.id === id)
    if (toChange){
        toChange.completed = !toChange.completed
    }
    saveToDos()
    renderToDos()
}

const todos = loadToDos()

export {getToDos,removeTodo,createToDo,saveToDos,markComplete}