function ProductDiv({user}){
   var date1= new Date(user.span);
   var date2 =new Date();
   function getDifferenceInDays(date1, date2){

      var diffInMs = Math.abs(date2 - date1);
      var exact_day = diffInMs / (1000 * 60 * 60 * 24);
      var exact_hours = diffInMs / (1000*60*60);
      var exact_months = diffInMs / (1000 * 60 * 60 * 24 * 30);
      var round_Month = Math.round(exact_months);
      var day=Math.round(exact_day);

      if (exact_hours < 1){
         //condition to check if posted within 1 hour
         var mins = getDifferenceInMinutes(date1, date2)
         return  `last updated ${mins} mins ago`
      }
      else if(exact_day < 1) {
           //condition to check if posted ad has passed 1 hour
        var hours=getDifferenceInHours(date1,date2);
         return  `last updated ${hours} hours ago`
      }
      else if (day == 1) {
         //condition to check if posted ad completed 1 day
         return  `last updated ${day} day ago`
      }
      else if (day > 1 && day < 30) {
          //condition to check if posted ad has crossed more than 1 day
         return `last updated ${day} days ago`
      }
      else if (round_Month == 1 )
      {
         return `last updated ${round_Month} month ago`
      }
      else if (round_Month > 1 )
      {
         return `last updated ${round_Month} months ago`
      }
   }
   function getDifferenceInHours(date1, date2) {
      //function to calculate ad hours difference from current time and the time ad was posted
      var diffInMs = Math.abs(date2 - date1);
      return Math.round (diffInMs / (1000*60*60));
    }
   function getDifferenceInMinutes(date1, date2) {
      //fuction to calculate ad minutes from current time and the time ad was posted
      const diffInMs = Math.abs(date2 - date1);
      return Math.round(diffInMs / (1000 * 60));
    }











    return(
        <>
      
   <div className="container mt-5 mb-5">
    <div className="d-flex justify-content-center row">
       <div className="col-md-10">
          <div className="row p-2 bg-white border rounded">
             <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" src={user.image_url[0]}>
                </img>
             </div>
             <div className="col-md-6 mt-1">
              <a className="a-tag" href={`/products/${encodeURIComponent(user.auctionId)}`}>{user.vehicleType} for Auction </a>
                <div className="mt-1 mb-1 spec-1">
                   <span>{user.vehicleColor} {user.engineType}cc </span><br />
                </div>
                <span>{getDifferenceInDays(date1, date2)}</span>
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