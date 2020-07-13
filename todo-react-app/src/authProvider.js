import { MsalAuthProvider, LoginType } from "react-aad-msal";


const config = {
    auth : {
        "clientId" : "1dfbb6bc-139e-4db2-9b15-81ab0b581fbd",
        "authority": "https://login.microsoftonline.com/8240eed4-15d9-4e26-b437-49d30ac61009",
        "redirectUri" : "http://localhost:3000",
        "postLogoutRedirectUri" : "http://localhost:3000"
    },
    cache : {
        "cacheLocation" : "sessionStorage"
    }
};

const authParameters= {
    scopes : ["openid", "email", "profile"]
};

const options = {
    loginType : LoginType.Redirect
};

export const authProvider = new MsalAuthProvider(config, authParameters, options)