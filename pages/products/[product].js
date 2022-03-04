import {useRouter } from 'next/router'
import Navbar from '../../component/navbar'
import Footer from "../../component/footer"

function ProductDetail({ProductDetail}){
    const router = useRouter()

    return(
        <>
        <Navbar/>
        <div>
        <h1>Product Detail</h1>
        {<div key={ProductDetail.auctionId} >
            
            <h3>{ProductDetail.vehicleType}</h3>
            <div className="container">
            <img width="600px" height="300px" src={ProductDetail.image_url} >
        
            </img>
            
           
           
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

           
            </div>
            
            </div>
           

        
        }
        </div>
        <Footer/>
        </>
    )

}
export async function getStaticPaths(){
    const response = await fetch('http://localhost:8000/auction')
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
    const response  = await fetch(`http://localhost:8000/auction?auctionid=${params.product}`)
    const data = await response.json()
    console.log(data)
    return {
        props : {
            ProductDetail : data,
        }
    }

}



export default ProductDetail