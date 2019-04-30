import {getToDos,removeTodo,markComplete} from './todos'
import {getFilters} from './filters';

// Generate new ToDo DOM Structure
const generateToDoDOM = (todo) => {
    //Create containing parent div
    const todoParent = document.createElement('label')
    todoParent.classList.add('list-item')
    
    const containerEl = document.createElement('div')
    containerEl.classList.add('list-item__container')

    //Create Completed Checkbox
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type','checkbox')
    checkBox.classList.add('checkbox')
    if(todo.completed){
        checkBox.checked = true
    }
    checkBox.addEventListener('change',(e) => {
        markComplete(todo.id)
    })

    // Create todo text
    const todoEl = document.createElement('span')
    todoEl.classList.add('list-item__title')
    todoEl.textContent = todo.text

    //Create remove button
    const removeButton = document.createElement('button')
    removeButton.classList.add('button','button--text')
    removeButton.textContent = 'x'
    removeButton.addEventListener('click',() => {
        removeTodo(todo.id)
    })

    // Add the DOM Elements  
    containerEl.appendChild(checkBox)
    containerEl.appendChild(todoEl)
    todoParent.appendChild(containerEl)
    todoParent.appendChild(removeButton)
    return todoParent
}

// Generate ToDo Summary DOM structure
const generateSummaryDOM = (filtToDos) => {
    const incompleteToDos = filtToDos.filter((todo) => !todo.completed)
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    let plural
    incompleteToDos.length === 1 ? plural = '' : plural = 's'
    summary.textContent = `You have ${incompleteToDos.length} todo${plural} left:` 
    return summary
}

// Render ToDos
const renderToDos = () => {
    const todos = getToDos()
    const {searchtext,filterCompleted} = getFilters()
    //console.log(searchtext,filterCompleted)

    //Clear ToDo Container
    document.querySelector('#todo-container').innerHTML=''
    
    //Get filtered list of todos
    const filtToDos = todos.filter((todo) => {
        const searchTextReturn = todo.text.toLowerCase().includes(searchtext.toLowerCase())
        let filterCheck = !filterCompleted || !todo.completed
        return searchTextReturn && filterCheck
    })

    //Generate Summary and add to top of list
    document.querySelector('#todo-container').appendChild(generateSummaryDOM(filtToDos))

    //Render ToDos based on filter
    if (filtToDos.length){
        filtToDos.forEach((todo) => {
            document.querySelector('#todo-container').appendChild(generateToDoDOM(todo))
        })
    }else{
        let emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No ToDos to show.'
        emptyMessage.classList.add('empty-message')
        document.querySelector('#todo-container').appendChild(emptyMessage)
    }
} 

export {renderToDos}