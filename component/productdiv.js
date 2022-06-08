import { useEffect, useState } from 'react';



function ProductDiv({user}){
   
   var closingDate = new Date(user.closingDate);
   var date1= new Date(user.span);
   var date2 = new Date();
 
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
   
   // Countdown timer work 
   function countDown (closingDate) {
      var countDownDate = closingDate; //5 days from the time ad was posted
      var now =  new Date(); //curent time.
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (minutes< 0 && seconds < 0 ){
         return `Auction Expired`
      } else if ( days == 0 ){
         return ` Auction Ends in ${hours} h ${minutes}m ${seconds}s `
      }
      else if ( days == 0 && hours == 0 ){
         return ` Auction Ends in ${minutes}m ${seconds}s `
      }
      else if ( days == 0 && hours == 0 && minutes == 0 ){
         return ` Auction Ends in ${seconds}s `
      }
      else {
         return ` Auction Ends in ${days}d ${hours} h ${minutes}m ${seconds}s `
      }
   }

   useEffect(() => {
   setInterval(() => {
     var counterUpdate= countDown(closingDate);
      document.getElementById('realTimer').innerHTML = counterUpdate
    }, 1000);
   }, [closingDate]);

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
              <a className="a-tag" href={`/products/${encodeURIComponent(user.auctionId)}`}>{user.adTitle} for Auction </a>
                <div className="mt-1 mb-1 spec-1">
                   <span>{user.modelYear} | {user.mileage}  | {user.engineType} | {user.engineCapacity}cc | {user.engineTransmission} </span><br />
                </div>
                <span >{getDifferenceInDays(date1, date2)}</span><br/>
                <span id="realTimer" > {countDown(closingDate)}</span>
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