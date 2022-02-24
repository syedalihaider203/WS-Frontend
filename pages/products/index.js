import ProductDiv from '../../component/productdiv'
import { useRouter } from 'next/router'


function Product({users}){
    const router = useRouter()
    return(
        <>
        <div className="container">
        <h1>Hello world</h1>
        <div> 
        <button type="button" className="btn btn-primary" onClick={() => router.push('products/insertAdd')}>
              Primary button
        </button>
        </div>
            {
                users.map((user)=>{
                    return (
                        <ProductDiv user={user}/>
                    );
                })
            }

        </div>

        </>
    )
}


export async function getStaticProps(){
    debugger
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