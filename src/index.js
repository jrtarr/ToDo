import {getToDos,createToDo} from './todos'
import {renderToDos} from './views.js'
import {updateFilters} from './filters.js'

let todos = getToDos()

renderToDos() //Initial render

const filterUpdate = {
    searchtext: undefined,
    filterCompleted: undefined
}

//Event Listeners

document.querySelector('#new-todo').addEventListener('submit',(e) => {
    e.preventDefault()
    const text = e.target.elements.newToDo.value.trim()
    createToDo(text)
    e.target.elements.newToDo.value = ''
})

document.querySelector('#show-incomplete').addEventListener('change',(e) => {
    filterUpdate.filterCompleted = e.target.checked
    updateFilters(filterUpdate)
    renderToDos()
})

document.querySelector('#filter-todo').addEventListener('input',(e) => {
    filterUpdate.searchtext = e.target.value
    updateFilters(filterUpdate)
    renderToDos()
})