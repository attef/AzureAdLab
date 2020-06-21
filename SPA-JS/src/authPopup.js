function signIn() {
    userAgentApplication.loginPopup({
        scopes : ["openid", "email", "profile"]
    })
    .then(function (response) {
        UI.onAuthenticatedUser(response.idToken.name);
    })
    .catch(function (error) {
        console.log(error);
    })
}