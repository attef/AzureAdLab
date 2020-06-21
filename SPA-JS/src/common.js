const maslConfig = {
    auth : {
        "clientId" : "1dfbb6bc-139e-4db2-9b15-81ab0b581fbd",
        "authority": "https://login.microsoftonline.com/8240eed4-15d9-4e26-b437-49d30ac61009",
        "redirectUri" : "https://localhost:3000"
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
