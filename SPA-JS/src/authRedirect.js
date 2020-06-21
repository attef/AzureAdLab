


userAgentApplication.handleRedirectCallback(authRedirectCallback);

function authRedirectCallback(error, response){
    if(error){
        console.log(error);
    }else{
        UI.onAuthenticatedUser(response.idToken.name);
    }
}

function signIn(){
    userAgentApplication.loginRedirect({
        scopes : ["openid", "email", "profile"]
    })
}

function getAccessToken(requestParams, callApi){
    userAgentApplication.acquireTokenSilent(requestParams)
        .then(function (accessTokenResponse) {
            const accessToken = accessTokenResponse.accessToken;
            callApi(accessToken);
        })
        .catch(function (error) {
            console.log(error);
            userAgentApplication.acquireTokenRedirect(requestParams);
        })
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


getMyTodos();