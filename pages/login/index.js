import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import { useRouter } from 'next/router'
import { Form ,Button} from 'react-bootstrap';

function login(){
    const router = useRouter()
    const handleSubmit = (event) => {
        var myHeaders = new Headers();
        debugger
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
    
        fetch("http://127.0.0.1:8000/auth/jwt/create/", requestOptions)
        .then(response => {
            debugger
            response.text()
        })
        .then(result =>{ 
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
                    <Form.Control type="email" placeholder="Enter email" id="userEmail" />
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