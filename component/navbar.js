import {destroyUserToken} from '../helperfunctions/loginhelper'
import { checkCookies,getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import {useState,useEffect} from 'react'
function navbar(){
    const router = useRouter()
    const [username, setUserName] = useState("")
    useEffect(() => {
        // Update the document title using the browser API
        // setUserName(getCookie("username"))
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
            
            <a href="/" class="active" >Whale Shoe</a>
            <a href="/products">Used Cars</a>
            <a href="/products/insertAdd">Post an Auction</a>
            <a onClick={userLogout}>Log out</a>
            <input type="text" class="active" placeholder="Search for names.."></input>
            <a >{username}</a>
            
            </div>
      
        </>
    )
}

export default navbar