import {useRouter } from 'next/router'
import Navbar from '../../component/navbar'
import Footer from "../../component/footer"
import Images from "../../component/images"

function ProductDetail({ProductDetail}){
    const router = useRouter()
    var image_key=ProductDetail.image_url
    var newObj = Object.keys(ProductDetail).splice(2,7)
    var newobj1 = ["Price", "Seller", "Primary Damage", "Body Style", "Vehicle Type", "Vehicle Color", "Engine Type"];
    var Objvalues=Object.values(ProductDetail).splice(2,7)
    newObj=newobj1;
    return(
        <>
        <Navbar />
        <h1>Product Detail</h1>
        { <div className="side" key={ProductDetail.auctionId} >
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
          </div>
        }
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
        <Footer/>
        </>
    )
}

// export async function getStaticPaths(){
//     const response = await fetch('http://localhost:8080/auction');
//     const data = await response.json();
//     const res_data = data.res;
//     // console.log(res_data)
//     const paths = res_data.map((product) =>{
//         console.log(product)
//         return {
//             params: {
//                 product : `${product.auctionId}`
//             }
//         }
//     })
//     return{
//         paths,
//         fallback: false
//     }   
// }

export async function getServerSideProps(context){
    const {params} = context;
    const response  = await fetch(`http://localhost:8080/auction?auctionid=${params.product}`)
    const data = await response.json();
    console.log(data)
    return {
        props : {
            ProductDetail : data,
        }
    }
}

export default ProductDetail