// Read todos from localStorage
const getToDos = function(){
    const todoJSON = localStorage.getItem('todos')
    if(todoJSON !== null){
        return JSON.parse(todoJSON)
    }else{
        return []
    }
}

// Save todos to localStorage
const saveToDos = function(todos){
    localStorage.setItem('todos',JSON.stringify(todos))
}

// Generate new ToDo DOM Structure
const generateToDoDOM = function(todo){
    //Create containing parent div
    const todoParent = document.createElement('div')
    todoParent.classList.add('todo')
    
    //Create Completed Checkbox
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type','checkbox')
    if(todo.completed){
        checkBox.checked = true
    }
    checkBox.addEventListener('change',function(e){
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
    removeButton.addEventListener('click',function(){
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
const generateSummaryDOM = function(filtToDos){
    const incompleteToDos = filtToDos.filter(function(todo){
        return !todo.completed
    })
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteToDos.length} items left on your To Do list:` 
    return summary
}

// Render ToDos
const renderToDos = function(todos, filters){
    //Clear ToDo Container
    document.querySelector('#todo-container').innerHTML=''
    
    //Get filtered list of todos
    const filtToDos = todos.filter(function(todo){
        const searchTextReturn = todo.text.toLowerCase().includes(filters.searchtext.toLowerCase())
        const filterCompleted = !filters.filterCompleted || !todo.completed
        return searchTextReturn && filterCompleted
    })

    //Generate Summary and add to top of list
    document.querySelector('#todo-container').appendChild(generateSummaryDOM(filtToDos))

    //Render ToDos based on filter
    filtToDos.forEach(function(todo){
        document.querySelector('#todo-container').appendChild(generateToDoDOM(todo))
    })
} 

// Remove ToDo
const removeTodo = function(uuid){
    const i = todos.findIndex(function(todo){
        return todo.id === uuid
    })
    if (i > -1){
        todos.splice(i,1)
    }
}

// Adjust values based on checkbox
function markComplete(id){
    const toChange = todos.find(function(todo){
        return todo.id === id
    })
    if (toChange !== undefined){
        toChange.completed = !toChange.completed
    }
}