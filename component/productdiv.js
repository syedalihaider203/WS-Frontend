import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
  } from "reactstrap";

  const cardStyle = { width: "18rem" };

function ProductDiv({user}){
    return(
        <>
        <Card style={cardStyle}>
        <CardImg
          alt="..."
          src={user.image_url}
          top
        ></CardImg>
        <CardBody>
          <CardTitle>{user.seller}</CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button color="primary" href="javascript:;">
            View Bid
          </Button>
        </CardBody>
      </Card>
      <br />

        </>
    )

}

export default ProductDiv