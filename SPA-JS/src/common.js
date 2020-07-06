const maslConfig = {
    auth : {
        "clientId" : "1dfbb6bc-139e-4db2-9b15-81ab0b581fbd",
        "authority": "https://login.microsoftonline.com/8240eed4-15d9-4e26-b437-49d30ac61009",
        "redirectUri" : "https://localhost:3000",
        "postLogoutRedirectUri" : "https://localhost:3000"
    },
    cache : {
        "cacheLocation" : "sessionStorage"
    }
}

var userAgentApplication = new Msal.UserAgentApplication(maslConfig);

var connectedUser = userAgentApplication.getAccount();
if(connectedUser){
    UI.onAuthenticatedUser(connectedUser.idToken.name);
}else{
    UI.onUnauthenticatedUser();
}



const apiScopes = [
    "api://4dbf2a2e-197e-4e51-8cb2-2fcd27554aa3/Todo.Add",
    "api://4dbf2a2e-197e-4e51-8cb2-2fcd27554aa3/Todo.Read",
    "api://4dbf2a2e-197e-4e51-8cb2-2fcd27554aa3/Todo.ReadAll"
];

function requestApi(endpoint, method, accessToken) {
    const headers = new Headers();
    headers.append("Authorization", "bearer "+ accessToken);
    return fetch(endpoint, {
        headers : headers,
        method : method
    })
    .then(function (response) {
        return response.json();
    })
}

function getMyTodos() {
    getAccessToken({scopes: apiScopes}, function (accessToken) {
        requestApi("https://localhost:5001/todo/myTodos", "GET", accessToken)
            .then(function (todos) {
                UI.showTodos(todos)
            });
    })
}

function AddTodo() {
    var titleInput = $("#todoTitle");
    getAccessToken({scopes : apiScopes}, function (accessToken) {
        requestApi("https://localhost:5001/todo/add?title="+titleInput.val(), "POST",
        accessToken)
        .then(function (todo) {
            UI.addTodo(todo);
            titleInput.val("");
        })
    })
}


function signOut() {
    userAgentApplication.logout();
}