import {useRouter } from 'next/router'
import Navbar from '../../component/navbar'
import Footer from "../../component/footer"
import Images from "../../component/images"
import { Button ,Modal} from 'react-bootstrap';
import {useState} from 'react'


function ProductDetail({ProductDetail,bidData}){
    const [currentbid,setCurrentBid] = useState(bidData.currentbid)
    const router = useRouter()
    var image_key=ProductDetail.image_url
    const [show, setShow] = useState(false);
    debugger
    const [auctionId,setAuctionId] = useState(ProductDetail.auctionId)

    const handleClose = (event) =>{
        var formdata = new FormData();
        debugger
        formdata.append("userid", event.target.userid.value);
        formdata.append("currentbid", event.target.currentbid.value);
        formdata.append("bid", event.target.bid.value);
        formdata.append("auctionid", auctionId);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8080/bid", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setCurrentBid(result.currentBid)
        })
        .catch(error => console.log('error', error));
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleCancel = () => setShow(false)
    var newObj = Object.keys(ProductDetail).splice(2,7)
    var newobj1 = ["Price", "Seller", "Primary Damage", "Body Style", "Vehicle Type", "Vehicle Color", "Engine Type"];
    var Objvalues=Object.values(ProductDetail).splice(2,7)
    newObj=newobj1;
    debugger
    return(
        <>
        <Navbar />
        <div>
        <h1>Product Detail</h1>
        {<div className="side" key={ProductDetail.auctionId} >
            
            <h3>{ProductDetail.vehicleType}</h3>
            <div className='side1' >
            {
                image_key.map((user)=>{
                    return (
                        <Images user={user}/>
                    );
                })
            }
            </div>
           <div className='side2'>
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Car Information</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody >
                <td>
               {
                  newObj.map((v)=>{
                      return <tr>{v}</tr>
                  })
               }
               </td>
               <td>
               {
                    Objvalues.map((v)=>{
                        return <tr>{v}</tr>
                    })
               }
               </td> 
                </tbody>
            </table>
 


            </div>
            
        </div>
    }
        <input type="text" value ={currentbid}/>
            <Button variant="primary" onClick={handleShow}>
            Launch demo modal
            </Button>

            <Modal show={show} onHide={handleCancel} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Place Bid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleClose}>
                        <div className='formGroup'>
                            <label htmlFor="userid">User Id:</label><br />
                            <input id="userid" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="currentbid">Current Bid:</label><br />
                            <input id="currentbid" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="bid">Bid:</label>
                            <br />
                            <input id="bid" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <Button type ="submit" variant="primary" >
                            Save Changes
                        </Button>

                        <br />
                        </form>

                        <Button type="submit" variant="secondary" onClick={handleCancel} >
                            Close
                        </Button>
            </Modal.Body>
            </Modal>
        </div>
        <br />
        <Footer/>
        </>
    )

}

export async function getStaticPaths(){
    const response = await fetch('http://localhost:8080/auction')
    const data = await response.json()
    const paths = data.map((product) =>{
        return {
            params: {
                product : `${product.auctionId}`
            }
        }
    })
    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
    const {params} = context
    const response  = await fetch(`http://localhost:8080/auction?auctionid=${params.product}`)
    const data = await response.json()
    console.log(data)
    const responseBid = await fetch(`http://localhost:8080/bid?auctionid=${params.product}`) 
    const biddata = await responseBid.json()

    return {
        props : {
            ProductDetail : data,
            bidData : biddata
        }
    }

}



export default ProductDetail