import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import { useRouter } from 'next/router'
import { Form ,Button} from 'react-bootstrap';
import {setUserToken} from '../../helperfunctions/loginhelper'
import { useState,useEffect } from 'react';
import { checkCookies } from 'cookies-next';
import {SERVER_URL} from '../../constants/url-strings'


function login(){
    const router = useRouter()
    const [isAutenticated,setUserAuthentication] = useState()
    useEffect(() => {
        // Update the document title using the browser API
        if(checkCookies("token")){
            router.push("/")
        }
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "username": event.target.userEmail.value,
            "password": event.target.userPassword.value
        });
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch(`${SERVER_URL}/auth/jwt/create/`, requestOptions)
        .then(response => 
            response.text()
        )
        .then(result =>{ 
            var obj = JSON.parse(result)
            if(obj.hasOwnProperty("access") && obj.hasOwnProperty("refresh")){
                var isAutenticated = setUserToken(obj)
            }
            if(isAutenticated){
                router.push("/")

            }
        })
        .catch(error => {
            console.log('error', error)
        });

    }

    return(
        <>
            <Navbar />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" id="userEmail" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="userPassword" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <Footer />
        </>
    )

}

export default login