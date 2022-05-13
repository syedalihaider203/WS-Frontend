import ProductDiv from '../../component/productdiv'
import { useRouter } from 'next/router'
import {useState,useContext } from 'react'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'

function Product({users}) {
    debugger
    const router = useRouter()
    const [pagevalue, setpagevalue] = useState(0)
   

    const handleClick = (e) => {
       
        setpagevalue(pagevalue=e.target.innerHTML)
        router.push(`?page=${e.target.innerHTML}`)
    }
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
        <div class="pagination">
        <a >&laquo;</a>
        <a onClick={handleClick}>1</a>
        <a class="active" onClick={handleClick}>2</a>
        <a onClick={handleClick}>3</a>
        <a onClick={handleClick}>4</a>
        <a onClick={handleClick}>5</a>
        <a onClick={handleClick}>6</a>
        <a >&raquo;</a>
        </div>
        <Footer/>
        </>
    )
}

export async function getStaticProps(context){
    console.log(context)
    // const mycontext=useContext(pagevalue)
    // console.log(mycontext)
    const response  = await fetch(`http://localhost:8080/auction?page=1`)
    const data = await response.json()
    return {
        props : {
            users : data,
        }
    }

}
export default Product
