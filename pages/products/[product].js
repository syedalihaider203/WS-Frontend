import {useRouter } from 'next/router'
function ProductDetail({ProductDetail}){
    const router = useRouter()

    return(
        <>
            {
                ProductDetail.auctionId
            }

        </>
    )

}
export async function getStaticPaths(){
    const response = await fetch('http://127.0.0.1:8000/auction')
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
    debugger
    const {params} = context
    const response  = await fetch(`http://127.0.0.1:8000/auction?auctionid=${params.product}`)
    const data = await response.json()
    console.log(data)
    return {
        props : {
            ProductDetail : data,
        }
    }

}

export default ProductDetail