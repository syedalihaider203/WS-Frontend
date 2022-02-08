import ProductDiv from '../../component/productdiv'

function Product({users}){
    return(
        <>
        <div className="container">
        <h1>Hello world</h1>
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