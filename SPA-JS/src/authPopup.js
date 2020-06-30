function signIn() {
    userAgentApplication.loginPopup({
        scopes : ["openid", "email", "profile"]
    })
    .then(function (response) {
        UI.onAuthenticatedUser(response.idToken.name);
        getAccessToken({scopes : apiScopes}, getMyTodos);
    })
    .catch(function (error) {
        console.log(error);
    })
}

function getAccessToken(requestParams, callback) {
    userAgentApplication.acquireTokenSilent(requestParams)
        .then(function (response) {
            callback(response.accessToken);
        })
        .catch(function (error) {
            console.log(error);
            userAgentApplication.acquireTokenPopup(requestParams)
                .then(function(response){
                    callback(response.accessToken);
                })
                .catch(function(error2){
                    console.log(error2);
                })
        })
}

var connectedUser = userAgentApplication.getAccount();
if(connectedUser){
    getAccessToken({scopes : apiScopes}, getMyTodos);
}