import { setCookies,checkCookies } from 'cookies-next';

export function setUserToken(args){
    setCookies("token",args.access)
    if(checkCookies('token')){
        return true
    }else{
        return false
    }
}
