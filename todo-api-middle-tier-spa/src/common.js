const maslConfig = {
    auth : {
        "clientId" : "b864025d-fa4b-4388-9d4f-ce84b05baa51",
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
    "api://062f60a3-e452-48ee-bbfe-b9cb4c21b4e7/All"
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

function getMyTodosCount() {
    getAccessToken({scopes: apiScopes}, function (accessToken) {
        requestApi("https://localhost:5002/todo/count", "GET", accessToken)
            .then(function (todosCount) {
                UI.showMyTodosCount(todosCount)
            });
    })
}

function signOut() {
    userAgentApplication.logout();
}