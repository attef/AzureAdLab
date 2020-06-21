


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