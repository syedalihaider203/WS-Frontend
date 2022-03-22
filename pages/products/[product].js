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
    return(
        <>
        <Navbar />
        <div>
        <h1>Product Detail</h1>
        {<div key={ProductDetail.auctionId} >
            
            <h3>{ProductDetail.vehicleType}</h3>
            <div className="well">
            
            {
                image_key.map((user)=>{
                    return (
                        <Images user={user}/>
                    );
                })
            }
           
            <table className='newtable'>
                  
                    <tr className='dataRow'>
                        <td className='dataColumn'>{}</td>
                        <td className='dataColumn'>Maria Anders</td>
                    </tr>
                    <tr className='dataRow'>
                        <td className='dataColumn'>Centro comercial Moctezuma</td>
                        <td className='dataColumn'>Francisco Chang</td>
                    </tr>
            </table>
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
            
            </div>
           

        
        }
        </div>
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