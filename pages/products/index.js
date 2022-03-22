import ProductDiv from '../../component/productdiv'
import { useRouter } from 'next/router'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
function Product({users}){
    const router = useRouter()
    return(
        <>
        <Navbar/>
        <div className="container">
        
        </div> 
        <div>
            {
                users.map((user)=>{
                    return (
                        <ProductDiv user={user}/>
                    );
                })
            }

        </div> 
        <Footer/>
        </>
    )
}

export async function getStaticProps(){
    const response  = await fetch('http://localhost:8080/auction')
    const data = await response.json()
    console.log(data)
    return {
        props : {
            users : data,
        }
    }

}


export default Product
