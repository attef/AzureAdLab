


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

getMyTodosCount();