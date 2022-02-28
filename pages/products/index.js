import ProductDiv from '../../component/productdiv'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
function Product({users}){
    return(
        <>
        <Navbar/>
        <div className="container">
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
    const response  = await fetch('http://127.0.0.1:8000/auction')
    const data = await response.json()
    console.log(data)
    return {
        props : {
            users : data,
        }
    }

}


export default Product
