
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

const UI = {
    onAuthenticatedUser,
    onUnauthenticatedUser,
}