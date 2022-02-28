import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
  } from "reactstrap";

//   const cardStyle = { width: "18rem"};

import { Link } from 'react-router-dom';
  import { Icon, Badge,Tag } from 'antd';
  import LazyLoad from 'react-lazyload';

function ProductDiv({user}){
    return(
        <>
        
        {/* <Card style={cardStyle}>
        
        <CardImg
          alt="..."
          src={user.image_url}
        ></CardImg>
       
        <CardBody>
          <CardTitle>{user.vehicleType}</CardTitle>
          <CardText>
            {user.engineType}
          </CardText>
          <Button color="primary" href={`/products/${encodeURIComponent(user.auctionId)}`}>
            View Bid
          </Button>
        </CardBody>
       
      </Card> */}
   <div className="container mt-5 mb-5">
    <div className="d-flex justify-content-center row">
       <div className="col-md-10">
          <div className="row p-2 bg-white border rounded">
             <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" src={user.image_url}>
                </img>
             </div>
             <div className="col-md-6 mt-1">
              <h5>{user.vehicleType}</h5>
                <div className="mt-1 mb-1 spec-1">
                   <span>{user.vehicleColor}</span>
                   <span className="dot"></span>
                   <span>{user.engineType}</span>
                </div>
               </div>
             <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                   <h4 className="mr-1">{user.price}</h4>
                </div>
                <div className="d-flex flex-column mt-4">
                  
                    <a  className="btn btn-primary btn-sm" href={`/products/${encodeURIComponent(user.auctionId)}`}> View Bid</a>
                 
              
                </div>
             </div>
          </div>
       </div>
    </div>
 </div>




        </>
    )

}

export default  ProductDiv 