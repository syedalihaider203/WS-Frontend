import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import { useRouter } from 'next/router'
import { Form ,Button} from 'react-bootstrap';
import {useState} from 'react'


function registration(){
    const router = useRouter()
    const [email,setEmail] = useState('')
    const [password,setPassword] =useState('')

    const handleSubmit = async (event) =>{
        debugger

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email" : event.target.useremail.value,
            "password": event.target.userpassword.value,
            "firstName": event.target.firstName.value,
            "lastName": event.target.lastName.value,
            "username": event.target.username.value
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/auth/users/", requestOptions)
        .then(response =>{ 
            debugger
            response.text()})
        .then(result => {
            debugger
            console.log(result)
        })
        .catch(error => {
            debugger
            console.log('error', error)
        });

    }

    return(
        <>
            <Navbar />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="useremail"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" id="userpassword"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" id="firstName" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" id="lastName"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" id="username"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Footer />
        </>
    )

}

export default registration