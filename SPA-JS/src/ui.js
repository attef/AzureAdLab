const listContainer = $("#todoList");

function onAuthenticatedUser(userName){
    $("#unAuthentifcatedUserWelcomeMessage").hide();
    $("#authentifcatedUserArea").show();
    $("#connectedUserName").text(userName);
    $("#navbarNavDropdown ul").show();
}

function onUnauthenticatedUser(){
    $("#unAuthentifcatedUserWelcomeMessage").show();
    $("#authentifcatedUserArea").hide();
    $("#connectedUserName").text("");
    $("#navbarNavDropdown ul").hide()
}

 
function showTodos(todos) {
    listContainer.html("");
    for (const todo of todos) {
        listContainer.append(`<li>${todo.title}</li>`)
    }
}

function addTodo(todo) {
    listContainer.append(`<li>${todo.title}</li>`)
}

const UI = {
    onAuthenticatedUser,
    onUnauthenticatedUser,
    showTodos,
    addTodo
}