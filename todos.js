let todos = getToDos()

const filters = {
    searchtext: '',
    filterCompleted: false
}
renderToDos(todos,filters) //Initial render

//Event Listeners

document.querySelector('#filter-todo').addEventListener('input',(e) => {
    filters.searchtext = e.target.value
    renderToDos(todos,filters)
})

document.querySelector('#new-todo').addEventListener('submit',(e) => {
    e.preventDefault()
    todos.push({
        id: uuidv4(),
        text: e.target.elements.newToDo.value,
        completed: false
    })
    saveToDos(todos)
    e.target.elements.newToDo.value = ''
    renderToDos(todos,filters)
})

document.querySelector('#show-incomplete').addEventListener('change',(e) => {
    filters.filterCompleted = e.target.checked
    renderToDos(todos,filters)
})