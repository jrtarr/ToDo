let todos = getToDos()

const filters = {
    searchtext: '',
    filterCompleted: false
}
console.log(todos)
todos = []
console.log(todos)
renderToDos(todos,filters) //Initial render

//Event Listeners

document.querySelector('#filter-todo').addEventListener('input',function(e){
    filters.searchtext = e.target.value
    renderToDos(todos,filters)
})

document.querySelector('#new-todo').addEventListener('submit',function(e){
    e.preventDefault()
    saveToDos(e.target.elements.newToDo.value)
    e.target.elements.newToDo.value = ''
    renderToDos(todos,filters)
})

document.querySelector('#show-incomplete').addEventListener('change',function(e){
    filters.filterCompleted = e.target.checked
    renderToDos(todos,filters)
})