// Read todos from localStorage
const getToDos = () => {
    const todoJSON = localStorage.getItem('todos')
    try{
        return todoJSON ? JSON.parse(todoJSON) : []
    }catch (e){
        return [] 
    }
}

// Save todos to localStorage
const saveToDos = (todos) => {
    localStorage.setItem('todos',JSON.stringify(todos))
}

// Generate new ToDo DOM Structure
const generateToDoDOM = (todo) => {
    //Create containing parent div
    const todoParent = document.createElement('div')
    todoParent.classList.add('todo')
    
    //Create Completed Checkbox
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type','checkbox')
    if(todo.completed){
        checkBox.checked = true
    }
    checkBox.addEventListener('change',(e) => {
        markComplete(todo.id)
        saveToDos(todos)
        renderToDos(todos,filters)
    })

    // Create todo text
    const newToDo = document.createElement('span')
    newToDo.textContent = todo.text

    //Create remove button
    const removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.textContent = 'x'
    removeButton.addEventListener('click',() => {
        removeTodo(todo.id)
        saveToDos(todos)
        renderToDos(todos,filters)
    })

    // Add the DOM Elements  
    todoParent.appendChild(checkBox)
    todoParent.appendChild(newToDo)
    todoParent.appendChild(removeButton)
    return todoParent
}

// Generate ToDo Summary DOM structure
const generateSummaryDOM = (filtToDos) => {
    const incompleteToDos = filtToDos.filter((todo) => !todo.completed)
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteToDos.length} items left on your To Do list:` 
    return summary
}

// Render ToDos
const renderToDos = (todos, filters) => {
    //Clear ToDo Container
    document.querySelector('#todo-container').innerHTML=''
    
    //Get filtered list of todos
    const filtToDos = todos.filter((todo) => {
        const searchTextReturn = todo.text.toLowerCase().includes(filters.searchtext.toLowerCase())
        const filterCompleted = !filters.filterCompleted || !todo.completed
        return searchTextReturn && filterCompleted
    })

    //Generate Summary and add to top of list
    document.querySelector('#todo-container').appendChild(generateSummaryDOM(filtToDos))

    //Render ToDos based on filter
    filtToDos.forEach((todo) => {
        document.querySelector('#todo-container').appendChild(generateToDoDOM(todo))
    })
} 

// Remove ToDo
const removeTodo = (uuid) => {
    const i = todos.findIndex((todo) => todo.id === uuid)
    if (i > -1){
        todos.splice(i,1)
    }
}

// Adjust values based on checkbox
const markComplete = (id) => {
    const toChange = todos.find((todo) => todo.id === id)
    if (toChange){
        toChange.completed = !toChange.completed
    }
}