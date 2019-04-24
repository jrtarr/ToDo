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
    let text = e.target.elements.newToDo.value.trim()
    if (text){
        todos.push({
            id: uuidv4(),
            text,
            completed: false
        })
        saveToDos(todos)
        e.target.elements.newToDo.value = ''
        renderToDos(todos,filters)
    }
    e.target.elements.newToDo.value = ''
})

document.querySelector('#show-incomplete').addEventListener('change',(e) => {
    filters.filterCompleted = e.target.checked
    renderToDos(todos,filters)
})