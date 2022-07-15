import ProductDiv from '../../component/productdiv'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Pagination from '../../component/pagination'
import {SERVER_URL} from '../../constants/url-strings'

function Product({users,page}) {
    debugger
    var paginationList=[]
    for (let i =0 ; i<page ; i++){
        paginationList.push(i+1); //list created to map total number of pages against used-cars.
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
        <div id='paginationGroup'>
        {
            paginationList.map((pages) =>{  
                return (
                    // populates dyanmic pagination div.
                    <Pagination pages={pages}/>
                )
            })
        }
        </div>
        <a >&raquo;</a>
        </div>
        <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    const searchQuery=context.query.vehicleMake
    const pageQuery = context.query.page
    if(searchQuery) {
    const newResponse  = await fetch(`${SERVER_URL}/search/?vehicleModel=${searchQuery}`)
    var data = await newResponse.json()
    console.log(data)
    } else {
        var response = await fetch(`${SERVER_URL}/auction?page=${pageQuery}`)
        var data = await response.json()
    }
    
    
    return {
        props : {
            users : data.res,
            page : data.pagecount //fetching total number of pages from server side to populate paginations divs
        }
    }
}
export default Product
