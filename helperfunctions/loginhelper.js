import { setCookies,checkCookies,removeCookies } from 'cookies-next';

export function setUserToken(args){
    setCookies("token",args.access)
    if(checkCookies('token')){
        return true
    }else{
        return false
    }
}

export function destroyUserToken(){
    removeCookies("token")

}

export function setUserDetails(username,email){
    setCookies("username",username)
    setCookies("email",email)
    if(checkCookies("username") && checkCookies("email")){
        return true
    }else{
        return false
    }
}
