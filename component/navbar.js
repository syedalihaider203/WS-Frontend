import {destroyUserToken} from '../helperfunctions/loginhelper'
import { checkCookies,getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import {useState,useEffect} from 'react'
function navbar(){
    const router = useRouter()
    const [username, setUserName] = useState("")
    useEffect(() => {
        // Update the document title using the browser API
        if(checkCookies("token")&& checkCookies("username")&& checkCookies("email")){
            setUserName(getCookie("username"))
        }
    },[]);
    const userLogout = (event) =>{
        event.preventDefault()
        destroyUserToken()
        if(!checkCookies("token")){
            router.push("/login")
        }
        
    }
    const style = {
        pointerEvents:'none'

    }
    return(
        <>
            <div class="topnav" id="myTopnav">
            
            <a href="/" class="active" style={style}>{username}</a>
            <a href="/products">Used Cars</a>
            <a href="/products/insertAdd">Post Add</a>
            <a onClick={userLogout}>Log out</a>

            <input type="text" class="active" placeholder="Search for names.."></input>
            
            </div>
      
        </>
    )
}

export default navbar